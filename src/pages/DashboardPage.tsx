import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAuth } from "../contexts/AuthContext";
import { dashboardService } from "../services/dashboardService";
import type { DashboardSummary } from "../types/dashboard";
import {
  TransactionCategoryLabels,
  TransactionTypeLabels,
} from "../types/transaction";
import { getFriendlyApiErrorMessage } from "../utils/apiError";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

type SummaryCardProps = {
  label: string;
  value: string;
  tone: "neutral" | "positive" | "negative" | "info";
};

const cardTones: Record<SummaryCardProps["tone"], string> = {
  neutral: "",
  positive: "summary-card-positive",
  negative: "summary-card-negative",
  info: "summary-card-info",
};

function SummaryCard({ label, value, tone }: SummaryCardProps) {
  return (
    <article
      className={`summary-card rounded-2xl border p-5 shadow-sm ${cardTones[tone]}`}
    >
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
    </article>
  );
}

export function DashboardPage() {
  const { user, logout } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getDashboardSummary();
      setSummary(data);
    } catch (requestError) {
      setError(getFriendlyApiErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  return (
    <main className="app-page min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              Visão geral
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Olá, {user?.name}
            </h1>
            <p className="mt-2 text-[var(--color-muted)]">
              Acompanhe seu resumo financeiro em um só lugar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={logout}
              className="app-button-secondary rounded-lg border px-4 py-2 text-sm font-medium"
            >
              Sair
            </button>
          </div>
        </header>

        <nav className="mt-8 flex flex-wrap gap-3" aria-label="Ações rápidas">
          <Link
            to="/wallets"
            className="app-button-primary rounded-lg px-4 py-2.5 text-sm font-semibold"
          >
            Nova carteira
          </Link>
          <Link
            to="/transactions"
            className="app-button-accent rounded-lg px-4 py-2.5 text-sm font-semibold"
          >
            Nova transação
          </Link>
        </nav>

        {loading && (
          <section
            className="app-card mt-8 rounded-2xl border p-8 text-center text-[var(--color-muted)]"
            aria-live="polite"
          >
            Carregando seu resumo financeiro...
          </section>
        )}

        {!loading && error && (
          <section
            className="app-error mt-8 rounded-2xl border p-6"
            role="alert"
          >
            <h2 className="font-semibold">
              Não foi possível carregar o dashboard
            </h2>
            <p className="mt-1 text-sm">{error}</p>
            <button
              type="button"
              onClick={() => void loadSummary()}
              className="app-button-accent mt-4 rounded-lg px-4 py-2 text-sm font-semibold"
            >
              Tentar novamente
            </button>
          </section>
        )}

        {!loading && !error && summary && (
          <>
            <section
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Resumo financeiro"
            >
              <SummaryCard
                label="Saldo total"
                value={currencyFormatter.format(summary.totalBalance)}
                tone="neutral"
              />
              <SummaryCard
                label="Total de entradas"
                value={currencyFormatter.format(summary.totalIncome)}
                tone="positive"
              />
              <SummaryCard
                label="Total de saídas"
                value={currencyFormatter.format(summary.totalExpense)}
                tone="negative"
              />
              <SummaryCard
                label="Carteiras ativas"
                value={String(summary.walletCount)}
                tone="info"
              />
              <SummaryCard
                label="Transações registradas"
                value={String(summary.transactionCount)}
                tone="info"
              />
            </section>

            <section className="app-card mt-8 overflow-hidden rounded-2xl border">
              <div className="border-b border-[var(--color-border)] px-5 py-4 sm:px-6">
                <h2 className="text-lg font-semibold">Últimas transações</h2>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Seus lançamentos mais recentes.
                </p>
              </div>

              {summary.recentTransactions.length === 0 ? (
                <div className="px-5 py-12 text-center sm:px-6">
                  <p className="font-medium">
                    Nenhuma transação recente.
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Suas próximas movimentações aparecerão aqui.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-[var(--color-border)]">
                  {summary.recentTransactions.map((transaction) => {
                    const isIncome = transaction.type === "INCOME";
                    const amountPrefix = isIncome ? "+" : "-";

                    return (
                      <li
                        key={transaction.id}
                        className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {transaction.description?.trim() || "Sem descrição"}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-muted)]">
                            {TransactionCategoryLabels[transaction.category]} ·{" "}
                            {transaction.walletName}
                          </p>
                          <p className="mt-1 text-xs text-[var(--color-muted)]">
                            {dateFormatter.format(new Date(transaction.createdAt))}
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <p
                            className={`font-bold ${
                              isIncome
                                ? "text-[var(--color-success)]"
                                : "text-[var(--color-danger)]"
                            }`}
                          >
                            {amountPrefix}
                            {currencyFormatter.format(transaction.amount)}
                          </p>
                          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                            {TransactionTypeLabels[transaction.type]}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
