import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  neutral: "border-slate-200 bg-white text-slate-900",
  positive: "border-emerald-100 bg-emerald-50 text-emerald-800",
  negative: "border-rose-100 bg-rose-50 text-rose-800",
  info: "border-blue-100 bg-blue-50 text-blue-800",
};

function SummaryCard({ label, value, tone }: SummaryCardProps) {
  return (
    <article className={`rounded-2xl border p-5 shadow-sm ${cardTones[tone]}`}>
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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Visão geral
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Olá, {user?.name}
            </h1>
            <p className="mt-2 text-slate-600">
              Acompanhe seu resumo financeiro em um só lugar.
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="self-start rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100"
          >
            Sair
          </button>
        </header>

        <nav className="mt-8 flex flex-wrap gap-3" aria-label="Ações rápidas">
          <Link
            to="/wallets"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Nova carteira
          </Link>
          <Link
            to="/transactions"
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Nova transação
          </Link>
        </nav>

        {loading && (
          <section
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm"
            aria-live="polite"
          >
            Carregando seu resumo financeiro...
          </section>
        )}

        {!loading && error && (
          <section
            className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-6"
            role="alert"
          >
            <h2 className="font-semibold text-rose-800">
              Não foi possível carregar o dashboard
            </h2>
            <p className="mt-1 text-sm text-rose-700">{error}</p>
            <button
              type="button"
              onClick={() => void loadSummary()}
              className="mt-4 rounded-lg bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-800"
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

            <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                <h2 className="text-lg font-semibold">Últimas transações</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Seus lançamentos mais recentes.
                </p>
              </div>

              {summary.recentTransactions.length === 0 ? (
                <div className="px-5 py-12 text-center sm:px-6">
                  <p className="font-medium text-slate-700">
                    Nenhuma transação recente.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Suas próximas movimentações aparecerão aqui.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {summary.recentTransactions.map((transaction) => {
                    const isIncome = transaction.type === "INCOME";
                    const amountPrefix = isIncome ? "+" : "-";

                    return (
                      <li
                        key={transaction.id}
                        className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {transaction.description?.trim() || "Sem descrição"}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {TransactionCategoryLabels[transaction.category]} ·{" "}
                            {transaction.walletName}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {dateFormatter.format(new Date(transaction.createdAt))}
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <p
                            className={`font-bold ${
                              isIncome ? "text-emerald-600" : "text-rose-600"
                            }`}
                          >
                            {amountPrefix}
                            {currencyFormatter.format(transaction.amount)}
                          </p>
                          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
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
