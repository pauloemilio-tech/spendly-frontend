import { useState } from "react";
import type { FormEvent } from "react";
import type { CreateWalletDTO, Wallet, WalletType, WalletStatus } from "../types/wallet";
import { WalletType as WalletTypeObj, WalletStatus as WalletStatusObj, WalletTypeLabels, WalletStatusLabels } from "../types/wallet";
import { walletService } from "../services/walletService";
import { getFriendlyApiErrorMessage } from "../utils/apiError";

type Props = {
  onCreated: (wallet: Wallet) => void;
};

export function WalletForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState<string>("0.00");
  const [type, setType] = useState<WalletType>(WalletTypeObj.CASH);
  const [status, setStatus] = useState<WalletStatus>(WalletStatusObj.ACTIVE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const parsedBalance = Number(balance);
    const initialBalance =
      balance.trim() === "" || Number.isNaN(parsedBalance)
        ? undefined
        : parsedBalance;

    const payload: CreateWalletDTO = {
      name: name.trim(),
      walletType: type,
      initialBalance,
      walletStatus: status,
    };

    try {
      const created = await walletService.createWallet(payload);
      onCreated(created);
      setName("");
      setBalance("0.00");
      setType(WalletTypeObj.CASH);
      setStatus(WalletStatusObj.ACTIVE);
    } catch (err) {
      setError(getFriendlyApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="app-card space-y-5 rounded-2xl border p-5 sm:p-6"
    >
      <div>
        <h2 className="text-lg font-semibold">Nova carteira</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Informe os dados para criar uma carteira.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          className="app-input mt-2 w-full rounded-lg border px-3.5 py-3 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Saldo inicial</label>
        <input
          type="number"
          step="0.01"
          className="app-input mt-2 w-full rounded-lg border px-3.5 py-3 outline-none"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as WalletType)}
            className="app-input mt-2 w-full rounded-lg border px-3.5 py-3 outline-none"
          >
            {Object.entries(WalletTypeObj).map(([, value]) => (
              <option key={value} value={value}>
                {WalletTypeLabels[value as WalletType]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as WalletStatus)}
            className="app-input mt-2 w-full rounded-lg border px-3.5 py-3 outline-none"
          >
            {Object.values(WalletStatusObj).map((s) => (
              <option key={s} value={s}>
                {WalletStatusLabels[s as WalletStatus]}
              </option>
            ))}
          </select>
        </div>
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
          {loading ? "Criando..." : "Criar wallet"}
        </button>
      </div>
    </form>
  );
}

export default WalletForm;
