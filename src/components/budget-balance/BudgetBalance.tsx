import type { Budget } from "../../types";
import "./budget-balance.scss";

interface BudgetBalanceProps {
  budget: Budget;
  spentAmount: number;
  remainingAmount: number;
}

const BudgetBalance = ({
  budget,
  spentAmount,
  remainingAmount,
}: BudgetBalanceProps) => {
  return (
    <div className="budget-balance">
      <div className="budget-balance__spent">
        <div
          style={{ backgroundColor: budget.theme }}
          className="budget-balance__spent-marker"
        ></div>
        <div className="budget-balance__spent-info">
          <span className="budget-balance__spent-title">Spent</span>
          <span className="budget-balance__spent-amount">
            ${spentAmount.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="budget-balance__remaining">
        <div className="budget-balance__remaining-marker"></div>
        <div className="budget-balance__remaining-info">
          <span className="budget-balance__remaining-title">Remaining</span>
          <span className="budget-balance__remaining-amount">
            ${remainingAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetBalance;
