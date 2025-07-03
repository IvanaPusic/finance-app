import React, { useContext, useState, createContext, useEffect } from "react";
import {
  type Budgets,
  type GlobalContextValue,
  type Transactions,
  type Balance,
  type Pots
} from "../types";

const GlobalContext = createContext<GlobalContextValue | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [balance, setBalance] = useState<Balance>({
    current: 0,
    income: 0,
    expenses: 0
  });
  const [budgets, setBudgets] = useState<Budgets[]>([]);
  const [pots, setPots] = useState<Pots[]>([]);

  const getData = async () => {
    try {
      const response = await fetch("./data.json");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])
  
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
        setPots
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobal = (): GlobalContextValue => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
