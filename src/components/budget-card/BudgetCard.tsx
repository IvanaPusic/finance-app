import dots from "../../assets/svgs/dots.svg";
import type { Budget, Transaction } from "../../types";
import { deleteBudget } from "../../firebase/dataManipulation";
import { useAuth } from "../../contexts/AuthContext";
import "./budget-card.scss";
import BudgetProgressBar from "../budget-progress-bar/BudgetProgressBar";
import BudgetBalance from "../budget-balance/BudgetBalance";
import LatestSpending from "../latest-spending/LatestSpending";

type BudgetCardProps = {
  budget: Budget;
  transactions: Record<string, Transaction[]>;
  activeCategory: string | null;
  setActiveCategory: (activeCategory: string | null) => void;
};

const BudgetCard = ({
  budget,
  transactions,
  activeCategory,
  setActiveCategory,
}: BudgetCardProps) => {
  const totalsByCategory = Object.fromEntries(
    Object.entries(transactions).map(([category, transactions]) => [
      category,
      transactions.reduce((sum, tx) => sum - tx.amount, 0),
    ])
  );

  const { currentUid } = useAuth();

  const isEditModalVisible = activeCategory === budget.category;

  const spentAmount = totalsByCategory[budget.category];
  const remainingAmount = budget.maximum - spentAmount;
  const recentTransactions = transactions[budget.category].slice(0, 3);

  return (
    <article
      onClick={() => {
        if (!isEditModalVisible) return;
        setActiveCategory(null);
      }}
      className="budget-card"
    >
      {isEditModalVisible && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="budget-card__edit-modal"
        >
          <button
            onClick={() => {
              console.log("delete");
              deleteBudget(currentUid, budget.category);
            }}
            className="budget-card__delete-budget-button"
          >
            <span>Delete budget</span>
          </button>
        </div>
      )}

      <div className="budget-card__category-container">
        <div className="budget-card__category">
          <div
            style={{ backgroundColor: budget.theme }}
            className="budget-card__color-dot"
          ></div>
          <h2 className="budget-card__category-title">{budget.category}</h2>
        </div>
        <button
          onClick={() => {
            if (isEditModalVisible) {
              setActiveCategory(null);
            } else {
              setActiveCategory(budget.category);
            }
          }}
          className="budget-card__edit-budget"
        >
          <img src={dots} alt="" />
        </button>
      </div>

      <div className="budget-card__maximum-container">
        <span className="budget-card__maximum-text">Maximum of</span>
        <span className="budget-card__maximum-amount">
          ${budget.maximum.toFixed(2)}
        </span>
      </div>

      <BudgetProgressBar budget={budget} spentAmount={spentAmount} />

      <BudgetBalance
        budget={budget}
        spentAmount={spentAmount}
        remainingAmount={remainingAmount}
      />

      <LatestSpending budget={budget} recentTransactions={recentTransactions} />
    </article>
  );
};

export default BudgetCard;
