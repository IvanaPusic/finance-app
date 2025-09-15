import type { Transaction } from "../../types";
import { Link } from "react-router-dom";
import caret from "../../assets/images/caret-right.png";
import { Timestamp } from "firebase/firestore";
import OverviewTransaction from "../overview-transaction/OverviewTransaction";
import "./transactions.scss";
type Props = {
  transactions: Transaction[];
  allTransactions: Transaction[];
};

const Transactions = ({ transactions, allTransactions }: Props) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  if (transactions.length <= 0) {
    return (
      <section className="transactions">
        <div className="transactions__container">
          <h2 className="transactions__container-title">Transactions</h2>
          <Link to="/transactions" className="transactions__container-link">
            <span>See details</span>
            <img src={caret} alt="" />
          </Link>
        </div>
        <h2 className="transactions__empty-field">No Transactions</h2>
      </section>
    );
  }

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
        {allTransactions
          .slice(0, 5)
          .map((transaction: Transaction, index: number) => {
            const transactionsDate = (transaction.date as Timestamp).toDate();

            const formattedDate = transactionsDate.toLocaleDateString(
              "en-GB",
              dateOptions
            );

            return (
              <OverviewTransaction
                key={index}
                transaction={transaction}
                formattedDate={formattedDate}
              />
            );
          })}
      </ul>
    </section>
  );
};

export default Transactions;
