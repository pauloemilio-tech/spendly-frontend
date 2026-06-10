import type {
  TransactionCategory,
  TransactionType,
} from "./transaction";

export type RecentTransaction = {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  walletName: string;
  createdAt: string;
};

export type DashboardSummary = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  walletCount: number;
  transactionCount: number;
  recentTransactions: RecentTransaction[];
};
