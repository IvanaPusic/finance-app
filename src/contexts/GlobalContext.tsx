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
  // const [recuuringBills, setRecurringBills] = useState();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [pots, setPots] = useState<Pot[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [isNewPotModalOpen, setIsNewPotModalOpen] = useState<boolean>(false);
  const [transactionInput, setTransactionInput] = useState<string>("");
  // Initialize from localStorage safely (wrap JSON.parse in try-catch)
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [categorySelect, setCategorySelect] = useState<string>("");
  const [sortBySelect, setSortBySelect] = useState("");
  const [transactionsPerPage, setTransactionsPerPage] = useState(10);
  const [paginationButtonsLength, setPaginationButtonsLength] = useState(() =>
    Math.ceil(allTransactions.length / transactionsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [buttons, setButtons] = useState<number[]>(() =>
    Array.from({ length: paginationButtonsLength }, (_, i) => i + 1)
  );
  const [transactionsByCategory, setTransactionsByCategory] = useState<
    Record<string, Transaction[]>
  >({});
  // Update pagination buttons length & buttons when allTransactions or transactionsPerPage change
  useEffect(() => {
    const length = Math.ceil(allTransactions.length / transactionsPerPage);
    setPaginationButtonsLength(length);
    setButtons(Array.from({ length }, (_, i) => i + 1));
  }, [allTransactions, transactionsPerPage]);
  useEffect(() => {
    console.log("budgets", budgets);
    console.log("transactions", transactions);
  }, [budgets, transactions]);

  // useEffect(() => {
  //   setSortBySelect("latest");
  //   const filteredTransactions = [...allTransactions].sort(
  //     (a, b) => b.date - a.date
  //   );
  //   setTransactions(filteredTransactions);
  // }, []);

  useEffect(() => {
    if (!currentUid) return;
    const userDocRef = doc(db, "users", currentUid);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const financialData = data.financialData || {};
        if (financialData) {
          localStorage.setItem(
            "transactions",
            JSON.stringify(financialData.transactions || [])
          );
          setTransactions(financialData.transactions || []);
          setAllTransactions(financialData.transactions || []);
          setBalance(
            financialData.balance || { current: 0, income: 0, expenses: 0 }
          );
          setBudgets(financialData.budgets || []);
          setPots(financialData.pots || []);
          setName(financialData.name || "");
          setEmail(financialData.email || "");
        }
      }
    });
    return () => unsubscribe();
  }, [currentUid]);

  useEffect(() => {
    if (budgets.length === 0 || allTransactions.length === 0) return;
    const grouped: Record<string, Transaction[]> = {};
    budgets.forEach((budget) => {
      grouped[budget.category] = allTransactions.filter(
        (transaction) => transaction.category === budget.category
      );
    });
    setTransactionsByCategory(grouped);
  }, [budgets, allTransactions]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    event: React.ChangeEvent<HTMLSelectElement>
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

  const checkSelectedCategory = (category: Category) => {
    let filteredData: Transaction[] = [];
    const copy = [...allTransactions];

    switch (category) {
      case "latest":
        filteredData = copy.sort(
          (a, b) => b.date.toDate().getTime() - a.date.toDate().getTime()
        );
        break;
      case "oldest":
        filteredData = copy.sort(
          (a, b) => a.date.toDate().getTime() - b.date.toDate().getTime()
        );
        break;
      case "A to Z":
        filteredData = copy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        filteredData = copy.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "highest":
        filteredData = copy
          .filter((num) => num.amount > 0)
          .sort((a, b) => b.amount - a.amount);
        break;
      case "lowest":
        filteredData = copy.sort((a, b) => a.amount - b.amount);
        break;
    }

    setTransactions(filteredData);
  };
  const handleSortBySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setSortBySelect(selectedSort);
    console.log("Selected sort", selectedSort);
    if (selectedSort) {
      checkSelectedCategory(selectedSort as Category);
    } else {
      setTransactions(allTransactions);
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
    transactionsByCategory,
    setTransactionsByCategory,
    isNewPotModalOpen,
    setIsNewPotModalOpen,
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
