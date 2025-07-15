import type { ChangeEvent } from "react";
import { Timestamp } from "firebase/firestore";

export interface AuthContextValue {
  isLoggedIn: boolean;
  logIn: (uid: string) => void;
  logOut: () => void;
  currentUid: string;
  setCurrentUid: (uid: string) => void;
}

export type Transaction = {
  avatar?: string;
  name: string;
  category: string;
  date: Timestamp;
  amount: number;
  recurring: boolean;
};

export type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

export type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

export type Balance = {
  current: number;
  income: number;
  expenses: number;
};

export type Sort = {
  id: number;
  value: string;
  title: string;
};

export type Category =
  | "latest"
  | "oldest"
  | "A to Z"
  | "Z to A"
  | "highest"
  | "lowest";

export interface GlobalContextValue {
  email: string;
  setEmail: (email: string) => void;

  name: string;
  setName: (name: string) => void;

  readonly password?: string;

  balance: Balance;
  setBalance: (balance: Balance) => void;

  transactions: Transaction[];
  setTransactions: (tx: Transaction[]) => void;

  allTransactions: Transaction[];
  setAllTransactions: (tx: Transaction[]) => void;
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;

  pots: Pot[];
  setPots: (pots: Pot[]) => void;

  isActive: boolean;
  setIsActive: (isActive: boolean) => void;

  transactionInput: string;
  setTransactionInput: (transactionInput: string) => void;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;

  categorySelect: string;
  setCategorySelect: (categorySelect: string) => void;
  handleCategorySelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  sortBySelect: string;
  setSortBySelect: (sortBySelect: string) => void;
  handleSortBySelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  transactionsPerPage: number;
  setTransactionsPerPage: (postsPerPage: number) => void;

  paginationButtonsLength: number;
  setPaginationButtonsLength: (paginationButtons: number) => void;

  currentPage: number;
  setCurrentPage: (currentPage: number) => void;

  buttons: number[];
  setButtons: (buttons: number[]) => void;

  handleDisplayTransactions: (id: number) => void;

  isButtonActive: boolean;
  setIsButtonActive: (isButtonActive: boolean) => void;

  transactionsByCategory: Record<string, Transaction[]>;
  setTransactionsByCategory: (
    transactionsByCategory: Record<string, Transaction[]>
  ) => void;
}
