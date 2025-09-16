import React from "react";

import { useGlobal } from "../../contexts/GlobalContext";
import {
  Budgets,
  StatCard,
  RecurringBills,
  Transactions,
} from "../../components";
import Pots from "../../components/pots/Pots";
import "./overview-page.scss";
import { useAuth } from "../../contexts/AuthContext";

const OverviewPage: React.FC = () => {
  const { balance, pots, transactions, budgets, allTransactions } = useGlobal();
  const { logOut } = useAuth();
  const totalSavingsValue = pots.reduce((sum, pot) => sum + pot.total, 0);

  const logoutHandler = () => {
    logOut();
  };
  return (
    <main className="overview">
      <h1 className="overview__title">Overview</h1>
      <button className="overview__logout-btn" onClick={logoutHandler}>
        Logout
      </button>
      <div className="overview__balance">
        <StatCard title="Current balance" value={`$ ${balance.current}`} />
        <StatCard title="Income" value={`$ ${balance.income}`} />
        <StatCard title="Expenses" value={`$ ${balance.expenses}`} />
      </div>
      <div className="overview__container">
        <Pots savingsValue={totalSavingsValue} pots={pots} />
        <Budgets budgets={budgets} />
        <Transactions
          transactions={transactions}
          allTransactions={allTransactions}
        />
        <RecurringBills />
      </div>
    </main>
  );
};

export default OverviewPage;
