import React from "react";
import { Budgets } from "../components";
import { useGlobal } from "../contexts/GlobalContext";

const BudgetsPage: React.FC = () => {
  const { budgets } = useGlobal();
  return (
    <main className="budgets-page">
      <h1 className="budgets-page__title">Budgets</h1>
      <Budgets layoutDirection="vertical" budgets={budgets} />
    </main>
  );
};

export default BudgetsPage;
