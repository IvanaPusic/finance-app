import type { Budget } from "../../types";
import { Link } from "react-router-dom";
import { useGlobal } from "../../contexts/GlobalContext";
import type { Transaction } from "../../types";
import avatar from "../../../public/avatars/james-thompson.png";
import "./latest-spending.scss";

interface LatestSpendingProps {
  budget: Budget;
  recentTransactions: Transaction[];
}

const LatestSpending = ({
  budget,
  recentTransactions,
}: LatestSpendingProps) => {
  const { setCategorySelect, allTransactions, setTransactions } = useGlobal();

  const handleSeeAll = () => {
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
    <div className="latest-spending">
      <div className="latest-spending__latest-title-container">
        <h2 className="latest-spending__latest-title">Latest Spending</h2>
        <Link
          to={"/transactions"}
          onClick={handleSeeAll}
          className="latest-spending__see-all"
        >
          See All
        </Link>
      </div>
      <ul className="latest-spending__list">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction, index) => (
            <li key={index} className="latest-spending__item">
              <div className="latest-spending__item-container">
                <div className="latest-spending__personal-info">
                  <img
                    className="latest-spending__avatar"
                    src={transaction.avatar || avatar}
                    alt=""
                  />
                  <span className="latest-spending__name">
                    {transaction.name}
                  </span>
                </div>
                <div className="latest-spending__transaction-info">
                  <span className="latest-spending__transaction-amount">
                    {transaction.amount.toFixed(2)}$
                  </span>
                  <span className="latest-spending__transaction-date">
                    {transaction.date
                      .toDate()
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </span>
                </div>
              </div>
              <div className="latest-spending__border-div"></div>
            </li>
          ))
        ) : (
          <li className="latest-spending__item">
            <div className="latest-spending__no-transactions">
              No recent transactions.
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default LatestSpending;
