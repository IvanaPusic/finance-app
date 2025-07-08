import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import type { Transaction } from "../types";

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

export const addTransaction = async (
  uid: string,
  newTransaction: Transaction
) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    throw new Error("User document does not exist");
  }

  const data = userSnapshot.data();
  const currentTransactions = data.transactions || [];

  // Add the new transaction to the array
  const updatedTransactions = [...currentTransactions, newTransaction];

  // Write updated array back
  await updateDoc(userDocRef, {
    transactions: updatedTransactions,
  });
};
