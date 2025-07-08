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

  // useEffect(() => {
  //   if (!currentUid) return;

  //   const fetchData = async () => {
  //     try {
  //       const userData = await getUserData(currentUid);
  //       if (userData) {
  //         // Set context state here with userData fields
  //         setBalance(userData.balance);
  //         setTransactions(userData.transactions);
  //         setBudgets(userData.budgets);
  //         setPots(userData.pots);
  //         setName(userData.name);
  //         setEmail(userData.email);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch user data:", err);
  //     }
  //   };

  //   fetchData();
  // }, [currentUid]);

  // useEffect(() => {
  //   if (currentUid) {
  //     console.log(currentUid);
  //   }
  // }, [currentUid]);

  // const getData = async () => {
  //   try {
  //     const response = await fetch("./data.json");
  //     const data = await response.json();
  //     console.log(data);
  //     setBalance(data.balance);
  //     setTransactions(data.transactions);
  //     setBudgets(data.budgets);
  //     setPots(data.pots);
  //     setTransactions(data.transactions);
  //     setBudgets(data.budgets);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    if (!currentUid) return;

    const userDocRef = doc(db, "users", currentUid);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setTransactions(data.transactions || []);
        setBalance(data.balance || { current: 0, income: 0, expenses: 0 });
        setBudgets(data.budgets || []);
        setPots(data.pots || []);
        setName(data.name || "");
        setEmail(data.email || "");
      }
    });

    return () => unsubscribe(); // 🔁 Clean up on unmount
  }, [currentUid]);

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
