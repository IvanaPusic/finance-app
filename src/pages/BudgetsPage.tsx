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

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [formData, setFormData] = useState<Budget>({
    category: "",
    maximum: 0,
    theme: "#277C78",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maximum" ? parseFloat(value) : value,
    }));
    console.log("hadnleChange:", formData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

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

              <label htmlFor="theme">Theme</label>
              <select
                className="budgets-page__dropdown"
                onChange={handleChange}
                name="theme"
                id="theme"
              >
                <option value="#277C78">
                  <span>Green</span>
                </option>
                <option value="#82C9D7">
                  <span>Cyan</span>
                </option>
                <option value="#F2CDAC">
                  <span>Yellow</span>
                </option>

                <option value="#626070">
                  <span>Navy</span>
                </option>
                <option value="#C94736">
                  <span>Red</span>
                </option>
                <option value="#826CB0">
                  <span>Purple</span>
                </option>
              </select>
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
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default BudgetsPage;
