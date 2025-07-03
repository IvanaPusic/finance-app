import React from "react";
import illustration from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";

const Illustration: React.FC = () => {
  return (
    <div className="illustration">
      <img className="illustration__logo" src={logo} alt="" />
      <img className="illustration__image" src={illustration} alt="" />
      <div className="illustration__text-container">
        <h2 className="illustration__heading">
          Keep track of your money and save for your future
        </h2>
        <p className="illustration__paragraph">
          Personal finance app puts you in control of your spending. Track
          transactions, set budgets, and add to savings pots easily.
        </p>
      </div>
    </div>
  );
};

export default Illustration;
