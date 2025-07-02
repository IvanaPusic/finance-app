import React from "react";
import { useAuth } from "../contexts/AuthContext";

const AuthDebug: React.FC = () => {
  const { isLoggedIn, logIn, logOut } = useAuth();
  console.log(isLoggedIn);

  return (
    <div style={{ padding: "1rem", border: "1px solid gray" }}>
      <p>Status: {isLoggedIn ? "✅ Logged In" : "❌ Logged Out"}</p>
      <button onClick={isLoggedIn ? logOut : logIn}>
        {isLoggedIn ? "Log Out" : "Log In"}
      </button>
    </div>
  );
};

export default AuthDebug;
