import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type {
  CreateTransactionDTO,
  Transaction,
  TransactionCategory,
  TransactionType,
} from "../types/transaction";
import {
  TRANSACTION_TYPES,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  TransactionTypeLabels,
  TransactionCategoryLabels,
} from "../types/transaction";
import type { Wallet } from "../types/wallet";
import { walletService } from "../services/walletService";
import { transactionService } from "../services/transactionService";
import { getFriendlyApiErrorMessage } from "../utils/apiError";

type Props = {
  onCreated: (t: Transaction) => void;
};

export function TransactionForm({ onCreated }: Props) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [walletId, setWalletId] = useState<number | "">("");
  const [type, setType] = useState<TransactionType>(TRANSACTION_TYPES[0]);
  const [category, setCategory] = useState<TransactionCategory | "">("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    walletService.getWallets().then((w) => {
      if (mounted) {
        setWallets(w);
        if (w.length > 0) setWalletId(w[0].id);
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!walletId) {
      setError("Selecione uma carteira");
      return;
    }

    if (!category) {
      setError("Categoria é obrigatória");
      return;
    }

    const nAmount = parseFloat(amount || "0");
    if (isNaN(nAmount) || nAmount <= 0) {
      setError("Informe um valor maior que zero");
      return;
    }

    const payload: CreateTransactionDTO = {
      walletId: Number(walletId),
      type,
      category: category as TransactionCategory,
      amount: nAmount,
      description: description.trim() || undefined,
    };

    setLoading(true);
    try {
      const created = await transactionService.createTransaction(payload);
      onCreated(created);
      // reset
      setCategory("");
      setAmount("");
      setDescription("");
    } catch (err) {
      setError(getFriendlyApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const categories = type === "INCOME" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <form
      onSubmit={handleSubmit}
      className="app-card space-y-5 rounded-2xl border p-5 sm:p-6"
    >
      <div>
        <h2 className="text-lg font-semibold">Nova transação</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Adicione uma movimentação à sua carteira.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium">Carteira</label>
        <select
          className="app-input mt-2 w-full rounded-lg border px-3.5 py-3 outline-none"
          value={walletId}
          onChange={(e) => setWalletId(Number(e.target.value))}
        >
          {wallets.map((w) => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <select
            className="app-input mt-2 w-full rounded-lg border px-3.5 py-3 outline-none"
            value={type}
            onChange={(e) => {
              setType(e.target.value as TransactionType);
              setCategory("");
            }}
          >
            {TRANSACTION_TYPES.map((t) => (
              <option key={t} value={t}>{TransactionTypeLabels[t]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Categoria</label>
          <select
            className="app-input mt-2 w-full rounded-lg border px-3.5 py-3 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            required
          >
            <option value="">Selecione</option>
            {categories.map((c) => (
              <option key={c} value={c}>{TransactionCategoryLabels[c]}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Valor</label>
        <input
          type="number"
          step="0.01"
          className="app-input mt-2 w-full rounded-lg border px-3.5 py-3 outline-none"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Descrição (opcional)</label>
        <input
          className="app-input mt-2 w-full rounded-lg border px-3.5 py-3 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {error && (
        <div className="app-error rounded-lg border px-4 py-3 text-sm" role="alert">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="app-button-primary rounded-lg px-4 py-2.5 font-semibold"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar transação"}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
