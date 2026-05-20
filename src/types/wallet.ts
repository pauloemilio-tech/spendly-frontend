export const WalletType = {
  CASH: "CASH",
  BANK: "BANK",
  CREDIT: "CREDIT",
  INVESTMENT: "INVESTMENT",
  OTHER: "OTHER",
} as const;

export type WalletType = (typeof WalletType)[keyof typeof WalletType];

export const WalletStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

export type WalletStatus = (typeof WalletStatus)[keyof typeof WalletStatus];

export interface Wallet {
  id: number;
  name: string;
  balance: number;
  walletType: WalletType;
  walletStatus: WalletStatus;
}

export interface CreateWalletDTO {
  name: string;
  balance?: number;
  walletType: WalletType;
  walletStatus?: WalletStatus;
}
