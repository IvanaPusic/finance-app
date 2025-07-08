import React, { useContext, useState, createContext, useEffect } from "react";
import type {
  Budget,
  GlobalContextValue,
  Transaction,
  Balance,
  Pot,
} from "../types";

const GlobalContext = createContext<GlobalContextValue | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({
    current: 0,
    income: 0,
    expenses: 0,
  });
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [pots, setPots] = useState<Pot[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

  const getData = async () => {
    try {
      const response = await fetch("./data.json");
      const data = await response.json();
      console.log(data);
      setBalance(data.balance);
      setTransactions(data.transactions);
      setBudgets(data.budgets);
      setPots(data.pots);
      setTransactions(data.transactions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        balance,
        setBalance,
        transactions,
        setTransactions,
        budgets,
        setBudgets,
        pots,
        setPots,
        isActive,
        setIsActive,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextValue => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be within Global Context");
  }
  return context;
};
