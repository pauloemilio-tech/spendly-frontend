import type { Transaction } from "../types/transaction";
import { TransactionTypeLabels, TransactionCategoryLabels } from "../types/transaction";

type Props = {
  transactions: Transaction[];
  loading: boolean;
  error?: string | null;
};

export function TransactionList({ transactions, loading, error }: Props) {
  if (loading) {
    return (
      <div className="app-state rounded-2xl border p-8 text-center">
        Carregando transações...
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

  if (!transactions || transactions.length === 0) {
    return (
      <div className="app-state rounded-2xl border p-8 text-center">
        <p className="font-medium text-[var(--color-text)]">
          Nenhuma transação registrada.
        </p>
        <p className="mt-1 text-sm">
          Suas próximas movimentações aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {transactions.map((t) => (
        <li
          key={t.id}
          className="app-card flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <div className="truncate font-semibold">
              {t.description ?? "(sem descrição)"}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="app-badge rounded-full border px-2.5 py-1 text-xs font-medium">
                {TransactionCategoryLabels[t.category]}
              </span>
              <span className="app-badge rounded-full border px-2.5 py-1 text-xs font-medium">
                {t.walletName}
              </span>
            </div>
            <div className="mt-2 text-xs text-[var(--color-muted)]">
              {new Date(t.createdAt).toLocaleString("pt-BR")}
            </div>
          </div>
          <div className="sm:text-right">
            <div
              className={`text-lg font-bold ${
                t.type === "INCOME"
                  ? "text-[var(--color-success)]"
                  : "text-[var(--color-danger)]"
              }`}
            >
              {t.type === "INCOME" ? "+" : "-"} R$ {t.amount.toFixed(2)}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
              {TransactionTypeLabels[t.type]}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
