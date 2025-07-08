import type { Transaction } from "../types";
import { Link } from "react-router-dom";
import caret from "../assets/images/caret-right.png";

type Props = {
  transactions: Transaction[];
};

const Transactions = ({ transactions }: Props) => {
  console.info("Transactions: ", transactions);
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return (
    <section className="transactions">
      <div className="transactions__container">
        <h2 className="transactions__container-title">Transactions</h2>
        <Link to="/transactions" className="transactions__container-link">
          <span>See details</span>
          <img src={caret} alt="" />
        </Link>
      </div>
      <ul className="transactions__content">
        {transactions.slice(0, 5).map((transaction: Transaction) => {
          const transactionsDate = new Date(transaction.date);
          const formatedDate = transactionsDate.toLocaleDateString(
            "en-GB",
            dateOptions
          );
          return (
            <li key={transaction.name} className="transactions__transaction">
              <div className="transactions__transaction-user">
                {transaction.avatar && (
                  <img src={transaction.avatar} alt={transaction.name} />
                )}
                <p className="transactions__transaction-user-name">
                  {transaction.name}
                </p>
              </div>
              <div className="transactions__transaction-info">
                <p
                  className={
                    transaction.amount > 0
                      ? `transactions__transaction-info-value-positive `
                      : `transactions__transaction-info-value`
                  }
                >
                  {transaction.amount > 0
                    ? `+$${transaction.amount}`
                    : `$${transaction.amount}`}
                </p>
                <p className="transactions__transaction-info-date">
                  {formatedDate}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Transactions;
