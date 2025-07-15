import React, { useContext, useState, createContext, useEffect } from "react";
import type {
  Budget,
  GlobalContextValue,
  Transaction,
  Balance,
  Pot,
  Category,
} from "../types";
import { useAuth } from "./AuthContext";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { updateFullFinancialData } from "../firebase/dataManipulation";
import dummyData from "../../public/data.json";

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
  const [endIndex, setEndIndex] = useState(10);
  const [transactionInput, setTransactionInput] = useState<string>("");
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(
    JSON.parse(localStorage.getItem("transactions") || "[]")
  );
  const [categorySelect, setCategorySelect] = useState<string>("");
  const [sortBySelect, setSortBySelect] = useState<string>("");
  const [transactionsPerPage, setTransactionsPerPage] = useState(10);
  const [paginationButtonsLength, setPaginationButtonsLength] = useState(
    Math.round(allTransactions.length / transactionsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [buttons, setButtons] = useState(
    Array.from({ length: paginationButtonsLength }, (_, i) => i + 1)
  );
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    if (!currentUid) return;

    const userDocRef = doc(db, "users", currentUid);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const { financialData } = docSnapshot.data();
        localStorage.setItem(
          "transactions",
          JSON.stringify(financialData.transactions)
        );
        setTransactions(financialData.transactions || []);
        setAllTransactions(financialData.transactions || []);
        setBalance(
          financialData.balance || { current: 0, income: 0, expenses: 0 }
        );
        setBudgets(financialData.budgets || []);
        setPots(financialData.pots || []);
        setName(financialData.name || "");
        setBudgets(financialData.budgets || []);
        setEmail(financialData.email || "");
      }
    });
    return () => unsubscribe(); // Clean up on unmount
  }, [currentUid, window.location.pathname]);

  const handleInput = (
    event: React.ChangeEvent & { target: HTMLInputElement }
  ) => {
    const inputValue = event.target.value;
    setTransactionInput(inputValue);

    if (inputValue) {
      const filteredData = allTransactions.filter((item: Transaction) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      );
      setTransactions(filteredData);
    } else {
      setTransactions(allTransactions);
    }
  };

  const handleCategorySelect = (
    event: React.ChangeEvent & { target: HTMLSelectElement }
  ) => {
    const selectedCategory = event.target.value;
    setCategorySelect(selectedCategory);

    if (selectedCategory) {
      const filteredData = allTransactions.filter(
        (item: Transaction) => item.category === selectedCategory
      );
      setTransactions(filteredData);
    } else {
      setTransactions(allTransactions);
    }
  };

  const checkSelectedCategory = (category: Category): Transaction[] => {
    let filteredData: Transaction[] = [];
    setSortBySelect(category);
    console.log(category);
    if (category === "latest") {
      filteredData = allTransactions.sort(
        (a, b) => b.date.toDate().getTime() - a.date.toDate().getTime()
      );
    } else if (category === "oldest") {
      filteredData = allTransactions.sort(
        (a, b) => a.date.toDate().getTime() - b.date.toDate().getTime()
      );
    } else if (category === "A to Z") {
      filteredData = allTransactions.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (category === "Z to A") {
      filteredData = allTransactions.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else if (category === "highest") {
      filteredData = allTransactions
        .filter((num) => num.amount > 0)
        .sort((a, b) => {
          return a.amount - b.amount;
        });
    } else if (category === "lowest") {
      filteredData = allTransactions.sort((a, b) => {
        return a.amount - b.amount;
      });
    }

    setTransactions(filteredData);
    return [];
  };

  const handleSortBySelect = (
    event: React.ChangeEvent & { target: HTMLSelectElement }
  ) => {
    const selectedCategory = event.target.value;
    setCategorySelect(selectedCategory);
    if (selectedCategory) {
      checkSelectedCategory(selectedCategory as Category);
    } else {
      setTransactions(transactions);
    }
  };

  const handleDisplayTransactions = (btn: number) => {
    setCurrentPage(btn);
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
    sortBySelect,
    setSortBySelect,
    paginationButtonsLength,
    transactionsPerPage,
    setPaginationButtonsLength,
    buttons,
    setButtons,
    setTransactionsPerPage,
    currentPage,
    setCurrentPage,
    handleSortBySelect,
    handleDisplayTransactions,
    isButtonActive,
    setIsButtonActive,
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
