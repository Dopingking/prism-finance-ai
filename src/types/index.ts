export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  currency: "NGN" | "USD";
  description: string;
  category: string;
  merchant: string;
  merchantLogo: string;
  date: string;
  status: "completed" | "pending" | "failed";
  recipient?: string;
  sender?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadline: string;
  icon: string;
  color: string;
  autoDeposit: number;
  autoDepositFrequency: "daily" | "weekly" | "monthly";
}

export interface InvestmentAsset {
  id: string;
  name: string;
  symbol: string;
  type: "stock" | "crypto" | "gold" | "etf";
  shares: number;
  buyPrice: number;
  currentPrice: number;
  change24h: number;
  allocation: number;
  logo: string;
}

export interface Card {
  id: string;
  type: "platinum" | "emerald";
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  frozen: boolean;
  spendingLimit: number;
  spendingUsed: number;
  color: string;
  accent: string;
}

export interface AIAdvice {
  id: string;
  title: string;
  description: string;
  type: "insight" | "alert" | "tip" | "suggestion";
  action?: string;
  impact?: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "payment" | "alert" | "reminder" | "promo" | "security";
  read: boolean;
  timestamp: string;
  actionable?: boolean;
  actionLabel?: string;
  actionRoute?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  tier: "basic" | "premium" | "platinum";
  kycVerified: boolean;
  twoFactorEnabled: boolean;
  faceIdEnabled: boolean;
  pinSet: boolean;
  createdAt: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  action: string;
}

export type Currency = "NGN" | "USD";

export interface AppState {
  user: UserProfile;
  balance: number;
  income: number;
  expenses: number;
  savings: number;
  investmentValue: number;
  creditScore: number;
  currency: Currency;
  isDark: boolean;
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  investments: InvestmentAsset[];
  cards: Card[];
  notifications: Notification[];
  aiMessages: AIMessage[];
  aiAdvice: AIAdvice[];
  isAIActive: boolean;
  isAuthenticated: boolean;
}