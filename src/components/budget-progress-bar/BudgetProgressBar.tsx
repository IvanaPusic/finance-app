import type { Budget } from "../../types";
import "./budget-progress-bar.scss";

interface BudgetProgressBarProps {
  budget: Budget;
  spentAmount: number;
}

const BudgetProgressBar = ({ budget, spentAmount }: BudgetProgressBarProps) => {
  return (
    <div className="progress-bar progress-bar--outer">
      <div
        style={{
          backgroundColor: budget.theme,
          width: `${(spentAmount / budget.maximum) * 100}%`,
        }}
        className="progress-bar progress-bar--inner"
      ></div>
    </div>
  );
};

export default BudgetProgressBar;
