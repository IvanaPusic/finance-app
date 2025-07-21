import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import type { Transaction, Balance, Budget, Pot } from "../types";

export const getUserData = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    console.log(userSnapshot.data());

    return userSnapshot.data(); // typed as any, cast or validate as needed
  } else {
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
  key: "transactions" | "budgets",
  newItem: T
) => {
  if (!uid) throw new Error("UID is required");

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User document does not exist");
  }

  const data = userSnap.data();
  const existingArray = data?.financialData?.[key] || [];

  const updatedArray = [...existingArray, newItem];

  await updateDoc(userRef, {
    [`financialData.${key}`]: updatedArray,
  });
};

export const addTransaction = async (
  uid: string,
  newTransaction: Transaction
) => {
  return updateFinancialDataArray(uid, "transactions", newTransaction);
};

export const addBudget = async (uid: string, newBudget: Budget) => {
  return updateFinancialDataArray(uid, "budgets", newBudget);
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
    (budget: any) => budget.category !== categoryToRemove
  );

  await updateDoc(userRef, {
    "financialData.budgets": updatedBudgets,
  });
};
