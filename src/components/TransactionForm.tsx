import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { CreateTransactionDTO, TransactionCategory, TransactionType } from "../types/transaction";
import { TRANSACTION_CATEGORIES, TRANSACTION_TYPES } from "../types/transaction";
import type { Wallet } from "../types/wallet";
import { walletService } from "../services/walletService";
import { transactionService } from "../services/transactionService";

type Props = {
  onCreated: (t: any) => void;
};

export function TransactionForm({ onCreated }: Props) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [walletId, setWalletId] = useState<number | "">("");
  const [type, setType] = useState<TransactionType>(TRANSACTION_TYPES[1]);
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
      setError("Selecione uma wallet");
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
      setError((err as Error).message || "Erro ao criar transação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700">Wallet</label>
        <select
          className="mt-1 w-full border rounded px-3 py-2"
          value={walletId}
          onChange={(e) => setWalletId(Number(e.target.value))}
        >
          {wallets.map((w) => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            className="mt-1 w-full border rounded px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
          >
            {TRANSACTION_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <select
            className="mt-1 w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            required
          >
            <option value="">Selecione</option>
            {TRANSACTION_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Valor</label>
        <input
          type="number"
          step="0.01"
          className="mt-1 w-full border rounded px-3 py-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição (opcional)</label>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar"}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
