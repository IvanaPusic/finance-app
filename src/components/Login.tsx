import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { firebaseLogIn } from "../firebase/auth";
import type React from "react";
import { useRef } from "react";
import { getUserData } from "../firebase/dataManipulation";

const Login: React.FC = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (emailRef.current && passwordRef.current) {
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        const user = await firebaseLogIn(emailValue, passwordValue);
        console.log(user);
        logIn(user.uid);
        getUserData(user.uid);
        navigate("/"); // ✅ redirect after login
      }
    } catch (error) {
      console.log(error);
    }
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
          ref={emailRef}
        />
        <label htmlFor="password">Password</label>
        <input
          className=" login__input login__input--password"
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
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
