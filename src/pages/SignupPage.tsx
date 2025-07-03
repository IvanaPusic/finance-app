import React from "react";
import Illustration from "../components/Illustration";
import Signup from "../components/Signup";

const SignupPage: React.FC = () => {
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
      <Signup />
    </div>
  );
};

export default SignupPage;
