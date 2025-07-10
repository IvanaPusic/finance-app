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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [transactionInput, setTransactionInput] = useState<string>("");
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [categorySelect, setCategorySelect] = useState<string>("");
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

  const getData = async () => {
    try {
      const response = await fetch("./data.json");
      const data = await response.json();
      console.log(data);

      setBalance(data.balance);
      setTransactions(data.transactions);
      setBudgets(data.budgets);
      setPots(data.pots);
      setAllTransactions(data.transactions);
      setTransactions(data.transactions);
      setBudgets(data.budgets);
    } catch (error) {
      console.error(error);
    }
  };

  const { currentUid } = useAuth();

  useEffect(() => {
    getData();
  }, []);

  // const getData = async () => {
  //   try {
  //     const response = await fetch("./data.json");
  //     const data = await response.json();
  //     console.log("Data", data);
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

  const handleInput = (
    event: React.ChangeEvent & { target: HTMLInputElement }
  ) => {
    setTransactionInput(event.target.value);
    if (event.target.value) {
      const filteredData = transactions.filter((item: Transaction) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setTransactions(filteredData);
    } else {
      setTransactions(allTransactions);
    }
  };

  const handleCategorySelect = (
    event: React.ChangeEvent & { target: HTMLSelectElement }
  ) => {
    setCategorySelect(event.target.value);
    if (event.target.value) {
      const filteredData = transactions.filter(
        (item: Transaction) => item.category === event.target.value
      );
      setTransactions(filteredData);
    } else {
      setTransactions(allTransactions);
    }
  };

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
    currentIndex,
    setCurrentIndex,
    startIndex,
    setStartIndex,
    endIndex,
    setEndIndex,
    transactionInput,
    setTransactionInput,
    handleInput,
    categorySelect,
    setCategorySelect,
    handleCategorySelect,
    allTransactions,
    setAllTransactions,
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
