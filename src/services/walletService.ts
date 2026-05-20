import { apiClient } from "../lib/apiClient";
import type { Wallet, CreateWalletDTO } from "../types/wallet";

const BASE = "/wallets";

export const walletService = {
  async getWallets(): Promise<Wallet[]> {
    const res = await apiClient.get<Wallet[]>(BASE);
    return res.data;
  },

  async createWallet(payload: CreateWalletDTO): Promise<Wallet> {
    const res = await apiClient.post<Wallet>(BASE, payload);
    return res.data;
  },
};

export default walletService;
