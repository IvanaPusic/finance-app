import React from "react";
import Illustration from "../../components/illustration/Illustration";
import Signup from "../../components/signup/Signup";
import logo from "../../assets/images/logo-dark.svg";
import "./signup.scss";

const SignupPage: React.FC = () => {
  return (
    <div className="signup">
      <Illustration />
      <div className="signup__logo">
        <img src={logo} alt="" />
      </div>
      <Signup />
    </div>
  );
};

export default SignupPage;
