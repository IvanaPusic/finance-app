import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  type ChangeEvent,
} from "react";
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
  const { currentUid } = useAuth();
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

  // useEffect(() => {
  //   if (!currentUid) return;

  //   const userDocRef = doc(db, "users", currentUid);

  //   const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
  //     if (docSnapshot.exists()) {
  //       const data = docSnapshot.data();
  //       setTransactions(data.transactions || []);
  //       setBalance(data.balance || { current: 0, income: 0, expenses: 0 });
  //       setBudgets(data.budgets || []);
  //       setPots(data.pots || []);
  //       setName(data.name || "");
  //       setEmail(data.email || "");
  //     }
  //   });

  //   return () => unsubscribe(); // 🔁 Clean up on unmount
  // }, [currentUid]);

  const handleInput = (event: ChangeEvent & { target: HTMLInputElement }) => {
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

  const handleNext = () => {
    setCurrentIndex((currentIndex) => {
      if (currentIndex > transactions.length - 1) {
        currentIndex = 0;
      }
      console.log(currentIndex);
      return currentIndex++;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex) => {
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      console.log(currentIndex);
      return currentIndex--;
    });
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
    handleNext,
    handlePrev,
    transactionInput,
    setTransactionInput,
    handleInput,
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
