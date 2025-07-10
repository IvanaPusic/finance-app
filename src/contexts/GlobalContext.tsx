import React, { useContext, useState, createContext, useEffect } from "react";
import type {
  Budget,
  GlobalContextValue,
  Transaction,
  Balance,
  Pot,
} from "../types";
import { useAuth } from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { updateFullFinancialData } from "../firebase/dataManipulation";
import dummyData from "../../public/data.json";

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

  const { currentUid } = useAuth();

  useEffect(() => {
    if (!currentUid) return;

    const userDocRef = doc(db, "users", currentUid);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log("exists");

        const { financialData } = docSnapshot.data();

        setTransactions(financialData.transactions || []);
        setBalance(
          financialData.balance || { current: 0, income: 0, expenses: 0 }
        );
        setBudgets(financialData.budgets || []);
        setPots(financialData.pots || []);
        setName(financialData.name || "");
        setEmail(financialData.email || "");
      }
    });

    return () => unsubscribe(); // 🔁 Clean up on unmount
  }, [currentUid]);

  const stateValues = {
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
  };

  return (
    <GlobalContext.Provider value={{ ...stateValues }}>
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

// helper function to populate dummy data into a user

// useEffect(() => {
//   const parsedDummyData = {
//     ...dummyData,
//     transactions: dummyData.transactions.map((tx) => ({
//       ...tx,
//       date: new Date(tx.date),
//     })),
//   };
//   try {
//     if (currentUid) {
//       updateFullFinancialData(currentUid, parsedDummyData);
//       console.log(currentUid);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }, [currentUid]);
