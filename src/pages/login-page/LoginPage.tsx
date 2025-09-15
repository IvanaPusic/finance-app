import React from "react";
import Illustration from "../../components/illustration/Illustration";
import Login from "../../components/login/Login";
import "./login.scss";
import logo from "../../assets/images/logo-dark.svg";

const LoginPage: React.FC = () => {
  return (
    <div className="login">
      <Illustration />
      <div className="login__logo">
        <img src={logo} alt="" />
      </div>
      <Login />
    </div>
  );
};

export default LoginPage;
