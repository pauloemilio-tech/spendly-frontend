export const TRANSACTION_TYPES = ["INCOME", "EXPENSE"] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const INCOME_CATEGORIES = [
  "SALARY",
  "FREELANCE",
  "INVESTMENT_RETURN",
  "GIFT",
  "OTHER_INCOME",
] as const;

export const EXPENSE_CATEGORIES = [
  "FOOD",
  "TRANSPORT",
  "HEALTH",
  "EDUCATION",
  "ENTERTAINMENT",
  "SHOPPING",
  "BILLS",
  "INVESTMENT",
  "OTHER_EXPENSE",
] as const;

export const TRANSACTION_CATEGORIES = [
  ...INCOME_CATEGORIES,
  ...EXPENSE_CATEGORIES,
] as const;
export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

export const TransactionTypeLabels: Record<TransactionType, string> = {
  INCOME: "Receita",
  EXPENSE: "Despesa",
};

export const TransactionCategoryLabels: Record<TransactionCategory, string> = {
  SALARY: "Salário",
  FREELANCE: "Freelance",
  INVESTMENT_RETURN: "Retorno de investimento",
  GIFT: "Presente",
  OTHER_INCOME: "Outra receita",
  FOOD: "Alimentação",
  TRANSPORT: "Transporte",
  HEALTH: "Saúde",
  EDUCATION: "Educação",
  ENTERTAINMENT: "Lazer",
  SHOPPING: "Compras",
  BILLS: "Contas",
  INVESTMENT: "Investimento",
  OTHER_EXPENSE: "Outra despesa",
};

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
