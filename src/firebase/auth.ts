// src/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";
import type { Transaction, Budget, Pot, Balance } from "../types";

type UserData = {
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
  balance: Balance;
};

// Register a new user
export const firebaseRegister = async (
  email: string,
  password: string,
  name: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // Store additional info in Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    email: user.email,
    createdAt: new Date().toISOString(),
    financeData: {
      transactions: [],
      budgets: [],
      pots: [],
      balance: { current: 0, income: 0, expenses: 0 },
    },
  });

  return user;
};

// Login an existing user
export const firebaseLogIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;
  return user;
};
