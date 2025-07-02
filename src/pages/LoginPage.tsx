import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import illustration from "../assets/images/illustration.svg";

const LoginPage: React.FC = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    logIn();
    navigate("/"); // ✅ redirect after login
  };

  return (
    <div className="login">
      <img src={illustration} />
      <div className="login__form-container">
        <h1>Login</h1>
        <form className="login__form" action="#">
          <label htmlFor="email">Email</label>
          <input
            className="login__email"
            itemID="email"
            type="email"
            name="email"
            id=""
          />
          <label htmlFor="password">Password</label>
          <input
            className="login__password"
            type="password"
            name="password"
            id="password"
          />
          <button className="login__button" type="submit">
            Login
          </button>
        </form>

        <span>Need to create an account?</span>
        <a href="#">Sign Up</a>

        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default LoginPage;
