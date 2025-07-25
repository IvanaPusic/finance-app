import React from "react";
import Illustration from "../components/illustration/Illustration";
import Login from "../components/Login";

const LoginPage: React.FC = () => {
  return (
    <div
      className="login"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1140px",
        margin: "0 auto",
      }}
    >
      <Illustration />
      <Login />
    </div>
  );
};

export default LoginPage;
