import React from "react";
import { Budgets } from "../components";
import { useGlobal } from "../contexts/GlobalContext";
import BudgetCard from "../components/BudgetCard";
import type { ReactNode } from "react";

const BudgetsPage: React.FC = () => {
  const { budgets, transactionsByCategory } = useGlobal();
  console.log(transactionsByCategory);

  return (
    <main className="budgets-page">
      <h1 className="budgets-page__title">Budgets</h1>
      <div className="budgets-page__main-container">
        <Budgets layoutDirection="vertical" budgets={budgets} />
        <div className="budgets-page__budgets-container">
          {Object.keys(transactionsByCategory).length > 0 &&
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
