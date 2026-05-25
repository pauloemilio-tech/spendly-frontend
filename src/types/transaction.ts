export const TRANSACTION_TYPES = ["INCOME", "EXPENSE"] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const TRANSACTION_CATEGORIES = [
  "SALARY",
  "FOOD",
  "TRANSPORT",
  "HEALTH",
  "EDUCATION",
  "ENTERTAINMENT",
  "SHOPPING",
  "BILLS",
  "INVESTMENT",
  "OTHER",
] as const;
export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

export type CreateTransactionDTO = {
  walletId: number;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  description?: string | null;
};

export type Transaction = {
  id: number;
  walletId: number;
  walletName: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  description?: string | null;
  createdAt: string;
};

export default {};
