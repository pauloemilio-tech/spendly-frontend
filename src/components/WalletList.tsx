import type { Wallet, WalletStatus, WalletType } from "../types/wallet";
import { WalletStatusLabels, WalletTypeLabels } from "../types/wallet";

type Props = {
  wallets: Wallet[];
  loading: boolean;
  error?: string | null;
  onDelete?: (id: number) => void;
  deletingIds?: number[];
};

export function WalletList({ wallets, loading, error, onDelete, deletingIds }: Props) {
  if (loading) {
    return (
      <div className="app-state rounded-2xl border p-8 text-center">
        Carregando carteiras...
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error rounded-2xl border p-5" role="alert">
        {error}
      </div>
    );
  }

  if (!wallets || wallets.length === 0) {
    return (
      <div className="app-state rounded-2xl border p-8 text-center">
        <p className="font-medium text-[var(--color-text)]">
          Nenhuma carteira cadastrada.
        </p>
        <p className="mt-1 text-sm">
          Sua primeira carteira aparecerá aqui.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {wallets.map((w) => {
        const typeLabel =
          w.walletType && WalletTypeLabels[w.walletType as WalletType]
            ? WalletTypeLabels[w.walletType as WalletType]
            : "Tipo desconhecido";
        const statusLabel =
          w.walletStatus && WalletStatusLabels[w.walletStatus as WalletStatus]
            ? WalletStatusLabels[w.walletStatus as WalletStatus]
            : "Status desconhecido";

        return (
          <li
            key={w.id}
            className="app-card flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="truncate font-semibold">{w.name}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="app-badge inline-flex rounded-full border px-2.5 py-1 text-xs font-medium">
                  {typeLabel}
                </span>
                <span className="app-badge inline-flex rounded-full border px-2.5 py-1 text-xs font-medium">
                  {statusLabel}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                  Saldo
                </p>
                <p className="mt-1 text-lg font-bold">
                  R$ {w.balance.toFixed(2)}
                </p>
              </div>
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(w.id)}
                  disabled={deletingIds?.includes(w.id)}
                  className="app-button-danger rounded-lg px-3 py-2 text-sm font-medium"
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
