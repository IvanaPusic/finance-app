import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type React from "react";

const Signup: React.FC = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn();
    navigate("/"); // ✅ redirect after login
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
        />
        <label htmlFor="email">Email</label>
        <input
          className="signup__input signup__input--email"
          itemID="email"
          type="email"
          name="email"
          id="email"
        />
        <label htmlFor="password">Create password</label>
        <input
          className=" signup__input signup__input--password"
          type="password"
          name="password"
          id="password"
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
