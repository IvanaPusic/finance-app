import React, { useState } from "react";
import { Budgets } from "../components";
import { useGlobal } from "../contexts/GlobalContext";
import { useAuth } from "../contexts/AuthContext";
import BudgetCard from "../components/BudgetCard";
import whitePlusIcon from "../assets/svgs/plus-white.svg";
import x from "../assets/svgs/x.svg";
import { addBudget } from "../firebase/dataManipulation";
import type { Budget } from "../types";

const BudgetsPage: React.FC = () => {
  const { budgets, transactionsByCategory } = useGlobal();
  console.log(transactionsByCategory);

  const { currentUid } = useAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState<Budget>({
    category: "",
    maximum: 0,
    theme: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maximum" ? parseFloat(value) : value,
    }));
    console.log("hadnleChange:", formData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalVisible(false);
    addBudget(currentUid, formData);
    console.log("handleSubmit", formData);
  };
  return (
    <main className="budgets-page">
      {isModalVisible && (
        <div
          className="budgets-page__modal-overlay"
          onClick={(e) => {
            setIsModalVisible(false);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="budgets-page__modal"
          >
            <div className="budgets-page__new-budget-title-container">
              <h3 className="budgets-page__new-budget-title">New Budget</h3>
              <button
                onClick={() => {
                  setIsModalVisible(false);
                }}
                className="budgets-page__close-modal"
              >
                <img src={x} alt="" />
              </button>
            </div>
            <form
              className="budgets-page__new-budget-form"
              onSubmit={handleSubmit}
              action=""
            >
              <label htmlFor="category">Category</label>
              <input
                required
                className="budgets-page__new-budget-input"
                type="text"
                name="category"
                id="category"
                onChange={handleChange}
              />

              <label htmlFor="amount">Maximum ($)</label>
              <input
                required
                className="budgets-page__new-budget-input"
                type="number"
                name="maximum"
                id="maximum"
                onChange={handleChange}
              />

              <label htmlFor="category">Color</label>
              <input
                required
                className="budgets-page__new-budget-input"
                type="text"
                name="theme"
                id="theme"
                onChange={handleChange}
              />
              <button className="budgets-page__new-budget-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="budgets-page__title-container">
        <h1 className="budgets-page__title">Budgets</h1>
        <button
          onClick={() => {
            setIsModalVisible(true);
          }}
          className="budgets-page__add-transaction"
        >
          <img
            className="budgets-page__add-transaction-icon"
            src={whitePlusIcon}
            alt=""
          />
          <span>Add New Budget</span>
        </button>
      </div>
      <div className="budgets-page__main-container">
        <Budgets layoutDirection="vertical" budgets={budgets} />
        <div className="budgets-page__budgets-container">
          {Object.keys(transactionsByCategory).length > 0 &&
            Object.keys(transactionsByCategory).length === budgets.length &&
            budgets.map((budget) => (
              <BudgetCard
                key={budget.category}
                budget={budget}
                transactions={transactionsByCategory}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default BudgetsPage;
