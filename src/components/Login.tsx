import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type React from "react";

const Login: React.FC = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn();
    navigate("/"); // ✅ redirect after login
  };

  const handleRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login__form-container">
      <h1 className="login__heading">Login</h1>
      <form onSubmit={handleLogin} className="login__form" action="">
        <label htmlFor="email">Email</label>
        <input
          className="login__input login__input--email"
          itemID="email"
          type="email"
          name="email"
          id=""
        />
        <label htmlFor="password">Password</label>
        <input
          className=" login__input login__input--password"
          type="password"
          name="password"
          id="password"
        />
        <button className="login__button" type="submit">
          Login
        </button>
      </form>
      <div className="login__text-container">
        <span className="login__text">Need to create an account?</span>
        <a onClick={handleRedirect} className="login__link" href="#">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Login;
