import { apiClient } from "../lib/apiClient";
import type { CreateTransactionDTO, Transaction } from "../types/transaction";

const BASE = "/transactions";

export const transactionService = {
  async getTransactions(): Promise<Transaction[]> {
    const res = await apiClient.get<Transaction[]>(BASE);
    return res.data;
  },

  async createTransaction(payload: CreateTransactionDTO): Promise<Transaction> {
    const res = await apiClient.post<Transaction>(BASE, payload);
    return res.data;
  },
};

export default transactionService;
