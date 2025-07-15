import React from "react";
import { Budgets } from "../components";
import { useGlobal } from "../contexts/GlobalContext";
import BudgetCard from "../components/BudgetCard";
import type { ReactNode } from "react";

const BudgetsPage: React.FC = () => {
  const { budgets } = useGlobal();
  console.log(budgets);

  return (
    <main className="budgets-page">
      <h1 className="budgets-page__title">Budgets</h1>
      <div className="budgets-page__main-container">
        <Budgets layoutDirection="vertical" budgets={budgets} />
        <div className="budgets-page__budgets-container">
          {budgets.map<ReactNode>((budget, index) => {
            return <BudgetCard key={index} budget={budget} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default BudgetsPage;
