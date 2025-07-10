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
