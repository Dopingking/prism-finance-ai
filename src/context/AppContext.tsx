import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { AppState, Transaction, SavingsGoal, InvestmentAsset, Card, Notification, AIMessage } from "@/types";
import {
  mockUser,
  mockTransactions,
  mockSavingsGoals,
  mockInvestments,
  mockCards,
  mockNotifications,
  mockAIMessages,
  mockAIAdvice,
} from "@/data/mockData";

type Action =
  | { type: "SET_CURRENCY"; payload: "NGN" | "USD" }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "TOGGLE_AI" }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "ADD_AI_MESSAGE"; payload: AIMessage }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "TOGGLE_CARD_FROZEN"; payload: string }
  | { type: "UPDATE_SAVINGS"; payload: { id: string; amount: number } }
  | { type: "SET_USER_AUTH"; payload: boolean };

const initialState: AppState = {
  user: mockUser,
  balance: 4845700,
  income: 1520000,
  expenses: 845700,
  savings: 8350000,
  investmentValue: 24850000,
  creditScore: 782,
  currency: "NGN",
  isDark: true,
  transactions: mockTransactions,
  savingsGoals: mockSavingsGoals,
  investments: mockInvestments,
  cards: mockCards,
  notifications: mockNotifications,
  aiMessages: mockAIMessages,
  aiAdvice: mockAIAdvice,
  isAIActive: false,
  isAuthenticated: true,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    case "TOGGLE_DARK_MODE":
      return { ...state, isDark: !state.isDark };
    case "TOGGLE_AI":
      return { ...state, isAIActive: !state.isAIActive };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "ADD_AI_MESSAGE":
      return { ...state, aiMessages: [...state.aiMessages, action.payload] };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };
    case "TOGGLE_CARD_FROZEN":
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.payload ? { ...c, frozen: !c.frozen } : c
        ),
      };
    case "UPDATE_SAVINGS":
      return {
        ...state,
        savingsGoals: state.savingsGoals.map((s) =>
          s.id === action.payload.id
            ? { ...s, saved: s.saved + action.payload.amount }
            : s
        ),
        balance: state.balance - action.payload.amount,
      };
    case "SET_USER_AUTH":
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}