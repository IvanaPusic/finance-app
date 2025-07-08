export interface AuthContextValue {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

export type Transaction = {
  avatar?: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  recurring: boolean;
};

export type Budget = {
  category: string;
  maximum: number;
  theme: number;
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

  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;

  pots: Pot[];
  setPots: (pots: Pot[]) => void;

  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}
