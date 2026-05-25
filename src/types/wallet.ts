export const WalletType = {
  BANK_ACCOUNT: "BANK_ACCOUNT",
  CASH: "CASH",
  CREDIT_CARD: "CREDIT_CARD",
  INVESTMENT: "INVESTMENT",
  DIGITAL_WALLET: "DIGITAL_WALLET",
} as const;

export type WalletType = (typeof WalletType)[keyof typeof WalletType];

export const WalletTypeLabels: Record<WalletType, string> = {
  BANK_ACCOUNT: "Conta bancária",
  CASH: "Dinheiro físico",
  CREDIT_CARD: "Cartão de crédito",
  INVESTMENT: "Investimento",
  DIGITAL_WALLET: "Carteira digital",
};

export const WalletStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

export type WalletStatus = (typeof WalletStatus)[keyof typeof WalletStatus];

export const WalletStatusLabels: Record<WalletStatus, string> = {
  ACTIVE: "Ativa",
  INACTIVE: "Inativa",
  ARCHIVED: "Arquivada",
};

export interface Wallet {
  id: number;
  name: string;
  balance: number;
  walletType: WalletType;
  walletStatus: WalletStatus;
}

export interface CreateWalletDTO {
  name: string;
  walletType: WalletType;
  initialBalance?: number;
  walletStatus?: WalletStatus;
}
