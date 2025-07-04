import React from "react";
import "../scss/styles.scss";
import { useGlobal } from "../contexts/GlobalContext";
import { StatCard } from "../components";
import Pots from "../components/Pots";
import { Transactions }from "../components";

const OverviewPage: React.FC = () => {
  const { balance, pots, transactions } = useGlobal();

  const totalSavingsValue = pots.reduce((sum, pot) => sum + pot.total, 0);
  
  return (
    <main className="overview">
      <h1>Overview</h1>
      <div className="overview__balance">
        <StatCard title = "Current balance" value={`$ ${balance.current}`} />
        <StatCard title = "Income" value={`$ ${balance.income}`} />
        <StatCard title = "Expenses" value={`$ ${balance.expenses}`} />
      </div>
      <Pots savingsValue={totalSavingsValue} pots={pots} />
      <Transactions transactions = {transactions}/>
    </main>
  );
};

export default OverviewPage;
