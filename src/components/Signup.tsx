import type React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRef } from "react";
import { firebaseRegister } from "../firebase/auth";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Transaction, Budget, Pot, Balance } from "../types";

const Signup: React.FC = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (emailRef.current && nameRef.current && passwordRef.current) {
        const emailValue = emailRef.current.value;
        const nameValue = nameRef.current.value;
        const passwordValue = passwordRef.current.value;
        const user = await firebaseRegister(
          emailValue,
          passwordValue,
          nameValue
        );
        logIn();
        navigate("/"); // ✅ redirect after login
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="signup__form-container">
      <h1 className="signup__heading">Login</h1>
      <form onSubmit={handleSignup} className="signup__form" action="">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="signup__input signup__input--name"
          type="text"
          ref={nameRef}
        />
        <label htmlFor="email">Email</label>
        <input
          className="signup__input signup__input--email"
          itemID="email"
          type="email"
          name="email"
          id="email"
          ref={emailRef}
        />
        <label htmlFor="password">Create password</label>
        <input
          className=" signup__input signup__input--password"
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
        />
        <button className="signup__button" type="submit">
          Sign up
        </button>
      </form>
      <div className="signup__text-container">
        <span className="signup__text">Already have an account?</span>
        <a onClick={handleRedirect} className="signup__link" href="#">
          Log in
        </a>
      </div>
    </div>
  );
};

export default Signup;
