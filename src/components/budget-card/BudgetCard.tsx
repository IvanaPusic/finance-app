import dots from "../../assets/svgs/dots.svg";
import avatar from "../../../public/avatars/james-thompson.png";
import type { Budget, Transaction } from "../../types";
import { Link } from "react-router-dom";
import { useGlobal } from "../../contexts/GlobalContext";
import { deleteBudget } from "../../firebase/dataManipulation";
import { useAuth } from "../../contexts/AuthContext";
import "./budget-card.scss";

type Props = {
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
}: Props) => {
  const totalsByCategory = Object.fromEntries(
    Object.entries(transactions).map(([category, transactions]) => [
      category,
      transactions.reduce((sum, tx) => sum - tx.amount, 0),
    ])
  );

  const {
    setCategorySelect,
    categorySelect,
    allTransactions,
    setTransactions,
  } = useGlobal();

  const { currentUid } = useAuth();

  const isEditModalVisible = activeCategory === budget.category;

  const spentAmount = totalsByCategory[budget.category];
  const remainingAmount = budget.maximum - spentAmount;
  const recentTransactions = transactions[budget.category].slice(0, 3);

  const handleSeeAll = () => {
    console.log(categorySelect);

    const selectedCategory = budget.category;

    setCategorySelect(selectedCategory);
    if (selectedCategory) {
      const filteredData = allTransactions.filter(
        (item: Transaction) => item.category === selectedCategory
      );
      setTransactions(filteredData);
    }
  };

  return (
    <div
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

      <div className="budget-card__progress-bar budget-card__progress-bar--outer">
        <div
          style={{
            backgroundColor: budget.theme,
            width: `${(spentAmount / budget.maximum) * 100}%`,
          }}
          className="budget-card__progress-bar budget-card__progress-bar--inner"
        ></div>
      </div>

      <div className="budget-card__balance">
        <div className="budget-card__spent">
          <div
            style={{ backgroundColor: budget.theme }}
            className="budget-card__spent-marker"
          ></div>
          <div className="budget-card__spent-info">
            <span className="budget-card__spent-title">Spent</span>
            <span className="budget-card__spent-amount">
              ${spentAmount.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="budget-card__remaining">
          <div className="budget-card__remaining-marker"></div>
          <div className="budget-card__remaining-info">
            <span className="budget-card__remaining-title">Remaining</span>
            <span className="budget-card__remaining-amount">
              ${remainingAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="budget-card__latest-spending">
        <div className="budget-card__latest-title-container">
          <h2 className="budget-card__latest-title">Latest Spending</h2>
          <Link
            to={"/transactions"}
            onClick={handleSeeAll}
            className="budget-card__see-all"
          >
            See All
          </Link>
        </div>
        <ul className="budget-card__list">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction, index) => (
              <li key={index} className="budget-card__item">
                <div className="budget-card__item-container">
                  <div className="budget-card__personal-info">
                    <img
                      className="budget-card__avatar"
                      src={transaction.avatar || avatar}
                      alt=""
                    />
                    <span className="budget-card__name">
                      {transaction.name}
                    </span>
                  </div>
                  <div className="budget-card__transaction-info">
                    <span className="budget-card__transaction-amount">
                      {transaction.amount.toFixed(2)}$
                    </span>
                    <span className="budget-card__transaction-date">
                      {transaction.date.toDate().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="budget-card__border-div"></div>
              </li>
            ))
          ) : (
            <li className="budget-card__item">
              <div className="budget-card__no-transactions">
                No recent transactions.
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BudgetCard;
