import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import type { Transaction, Balance, Budget, Pot } from "../types";

export const getUserData = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) return userSnapshot.data();
  else {
    return null;
  }
};

export const updateFullFinancialData = async (
  uid: string,
  data: {
    transactions?: Transaction[];
    balance?: Balance;
    budgets?: Budget[];
    pots?: Pot[];
  }
) => {
  const userRef = doc(db, "users", uid);
  if (!uid) {
    throw new Error("UID is required for updateFullFinancialData");
  }

  await updateDoc(userRef, {
    financialData: data,
  });
};

const updateFinancialDataArray = async <T>(
  uid: string,
  key: "transactions" | "budgets" | "pots",
  newItem: T,
  options: { prepend?: boolean } = {}
) => {
  if (!uid) throw new Error("UID is required");

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User document does not exist");
  }

  const data = userSnap.data();
  const existingArray = data?.financialData?.[key] || [];

  newItem = { ...newItem, id: crypto.randomUUID() };

  const updatedArray = options.prepend
    ? [newItem, ...existingArray]
    : [...existingArray, newItem];

  await updateDoc(userRef, {
    [`financialData.${key}`]: updatedArray,
  });
};

export const addTransaction = async (
  uid: string,
  newTransaction: Transaction,
  prepend: boolean = true
) => {
  return updateFinancialDataArray(uid, "transactions", newTransaction, {
    prepend,
  });
};

export const addBudget = async (
  uid: string,
  newBudget: Budget,
  prepend: boolean = true
) => {
  return updateFinancialDataArray(uid, "budgets", newBudget, { prepend });
};

export const addPot = async (
  uid: string,
  newPot: Pot,
  prepend: boolean = true
) => {
  return updateFinancialDataArray(uid, "pots", newPot, { prepend });
};

export const deleteBudget = async (uid: string, categoryToRemove: string) => {
  if (!uid) throw new Error("UID is required");

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User document does not exist");
  }

  const data = userSnap.data();
  const existingBudgets = data?.financialData?.budgets || [];

  const updatedBudgets = existingBudgets.filter(
    (budget: Budget) => budget.category !== categoryToRemove
  );

  await updateDoc(userRef, {
    "financialData.budgets": updatedBudgets,
  });
};
