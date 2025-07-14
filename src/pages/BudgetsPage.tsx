import React from "react";
import { Budgets } from "../components";
import { useGlobal } from "../contexts/GlobalContext";
import BudgetCard from "../components/BudgetCard";

const BudgetsPage: React.FC = () => {
  const { budgets } = useGlobal();
  return (
    <main className="budgets-page">
      <h1 className="budgets-page__title">Budgets</h1>
      <div className="budgets-page__main-container">
        <Budgets layoutDirection="vertical" budgets={budgets} />
        <BudgetCard />
      </div>
    </main>
  );
};

export default BudgetsPage;
