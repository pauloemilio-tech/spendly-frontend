import type { Wallet, WalletType } from "../types/wallet";
import { WalletTypeLabels } from "../types/wallet";

type Props = {
  wallets: Wallet[];
  loading: boolean;
  error?: string | null;
  onDelete?: (id: number) => void;
  deletingIds?: number[];
};

export function WalletList({ wallets, loading, error, onDelete, deletingIds }: Props) {
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
      {wallets.map((w) => {
        const typeLabel =
          w.walletType && WalletTypeLabels[w.walletType as WalletType]
            ? WalletTypeLabels[w.walletType as WalletType]
            : "Tipo desconhecido";

        return (
          <li
            key={w.id}
            className="flex items-center justify-between p-4 bg-white rounded shadow-sm"
          >
            <div>
              <div className="font-medium">{w.name}</div>
              <div className="text-sm text-gray-500">{typeLabel}</div>
            </div>
            <div className="text-right font-semibold">
              R$ {w.balance.toFixed(2)}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(w.id)}
                  disabled={deletingIds?.includes(w.id)}
                  className="ml-3 px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50 text-sm"
                >
                  {deletingIds?.includes(w.id) ? "Desativando..." : "Desativar"}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default WalletList;
