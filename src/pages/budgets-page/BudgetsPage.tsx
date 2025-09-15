import React, { useState } from "react";
import { Budgets } from "../../components";
import { useGlobal } from "../../contexts/GlobalContext";
import BudgetCard from "../../components/budget-card/BudgetCard";
import whitePlusIcon from "../../assets/svgs/plus-white.svg";
import AddBudgetModal from "../../components/budget-modal/AddBudgetModal";
import "./budgets-page.scss";

const BudgetsPage: React.FC = () => {
  const { budgets, transactionsByCategory } = useGlobal();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <main className="budgets-page">
      {isModalVisible && (
        <AddBudgetModal setIsModalVisible={setIsModalVisible} />
      )}

      <div className="budgets-page__title-container">
        <h1 className="budgets-page__title">Budgets</h1>
        <button
          onClick={() => {
            setIsModalVisible(true);
          }}
          className="budgets-page__add-budget"
        >
          <img
            className="budgets-page__add-budget-icon"
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
