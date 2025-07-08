import React from "react";
// import { useGlobal } from "../contexts/GlobalContext";
// import type { Transaction } from "../types";
import { Link } from "react-router-dom";
import caret from "../assets/images/caret-right.png";

const RecurringBills = () => {
  return (
    <section className="recurring-bills">
      <div className="recurring-bills__container">
        <h2 className="recurring-bills__container-title">Recurring Bills</h2>
        <Link to="/recurring-bills" className="recurring-bills__container-link">
          <span>See Details</span>
          <img src={caret} alt="" />
        </Link>
      </div>
      <ul className="recurring-bills__list">
        <li className="recurring-bills__list-item">
          <p className="recurring-bills__list-item-title">Paid bills</p>
          <p className="recurring-bills__list-item-value">$190</p>
        </li>
        <li className="recurring-bills__list-item">
          <p className="recurring-bills__list-item-title">Total Upcoming</p>
          <p className="recurring-bills__list-item-value">$194.98</p>
        </li>
        <li className="recurring-bills__list-item">
          <p className="recurring-bills__list-item-title">Due Soon</p>
          <p className="recurring-bills__list-item-value">$59.98</p>
        </li>
      </ul>
    </section>
  );
};

export default RecurringBills;
