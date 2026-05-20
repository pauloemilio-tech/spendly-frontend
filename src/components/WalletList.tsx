import type { Wallet } from "../types/wallet";

type Props = {
  wallets: Wallet[];
  loading: boolean;
  error?: string | null;
};

export function WalletList({ wallets, loading, error }: Props) {
  if (loading) {
    return <div className="p-4">Carregando wallets...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Erro: {error}</div>;
  }

  if (!wallets || wallets.length === 0) {
    return <div className="p-4 text-gray-600">Nenhuma wallet cadastrada.</div>;
  }

  return (
    <ul className="space-y-2">
      {wallets.map((w) => (
        <li
          key={w.id}
          className="flex items-center justify-between p-4 bg-white rounded shadow-sm"
        >
          <div>
            <div className="font-medium">{w.name}</div>
            <div className="text-sm text-gray-500">{w.walletType} — {w.walletStatus}</div>
          </div>
          <div className="text-right font-semibold">R$ {w.balance.toFixed(2)}</div>
        </li>
      ))}
    </ul>
  );
}

export default WalletList;
