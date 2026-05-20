import { useState } from "react";
import type { FormEvent } from "react";
import type { CreateWalletDTO, Wallet, WalletType, WalletStatus } from "../types/wallet";
import { WalletType as WalletTypeObj, WalletStatus as WalletStatusObj } from "../types/wallet";
import { walletService } from "../services/walletService";

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

    const payload: CreateWalletDTO = {
      name: name.trim(),
      balance: parseFloat(balance || "0"),
      walletType: type,
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
      setError((err as Error).message || "Erro ao criar wallet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Saldo inicial</label>
        <input
          type="number"
          step="0.01"
          className="mt-1 w-full border rounded px-3 py-2"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as WalletType)}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            {Object.values(WalletTypeObj).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as WalletStatus)}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            {Object.values(WalletStatusObj).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar wallet"}
        </button>
      </div>
    </form>
  );
}

export default WalletForm;
