import React, { createContext, useContext, useEffect, useState } from "react";
import { type AuthContextValue } from "../types";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUid, setCurrentUid] = useState<string>("");

  const logIn = (uid: string) => {
    setIsLoggedIn(true);
    setCurrentUid(uid);
    localStorage.setItem("uid", uid);
  };
  const logOut = () => {
    setIsLoggedIn(false);
    setCurrentUid("");
    localStorage.removeItem("uid");
  };

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
