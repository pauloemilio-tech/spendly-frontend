import type { Transaction } from "../types/transaction";
import { TransactionTypeLabels, TransactionCategoryLabels } from "../types/transaction";

type Props = {
  transactions: Transaction[];
  loading: boolean;
  error?: string | null;
};

export function TransactionList({ transactions, loading, error }: Props) {
  if (loading) return <div className="p-4">Carregando transações...</div>;
  if (error) return <div className="p-4 text-red-600">Erro: {error}</div>;
  if (!transactions || transactions.length === 0) return <div className="p-4 text-gray-600">Nenhuma transação.</div>;

  return (
    <ul className="space-y-2">
      {transactions.map((t) => (
        <li key={t.id} className="p-4 bg-white rounded shadow-sm flex items-center justify-between">
          <div>
            <div className="font-medium">{t.description ?? "(sem descrição)"}</div>
            <div className="text-sm text-gray-500">
              {t.walletName} • {TransactionTypeLabels[t.type]} • {TransactionCategoryLabels[t.category]} • {new Date(t.createdAt).toLocaleString()}
            </div>
          </div>
          <div className={`font-semibold ${t.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
            R$ {t.amount.toFixed(2)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
