import { useEffect, useState } from "react";
import { transactionService } from "../services/transactionService";
import type { Transaction } from "../types/transaction";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError((err as Error).message || "Erro ao carregar transações");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleCreated(t: Transaction) {
    // prepend new transaction
    setTransactions((prev) => [t, ...prev]);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Transações</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <TransactionForm onCreated={handleCreated} />
        </div>

        <div className="md:col-span-2">
          <TransactionList transactions={transactions} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
