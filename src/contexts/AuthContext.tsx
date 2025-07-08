// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { type AuthContextValue } from "../types";

// Create context with default `undefined` for safety
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUid, setCurrentUid] = useState<string>("");

  const logIn = (uid: string) => {
    setIsLoggedIn(true);
    setCurrentUid(uid);
  };
  const logOut = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logIn, logOut, currentUid, setCurrentUid }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
