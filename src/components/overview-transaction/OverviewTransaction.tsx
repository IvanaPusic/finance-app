import type { Transaction } from "../../types";
import "./overview-transaction.scss";

interface TransactionProps {
  transaction: Transaction;
  formattedDate: string;
}

const OverviewTransaction = ({
  transaction,
  formattedDate,
}: TransactionProps) => {
  const { name, avatar, amount } = transaction;

  return (
    <li className="transaction">
      <div className="transaction__user">
        {avatar && <img src={avatar} alt={name} />}
        <p className="transaction__user-name">{name}</p>
      </div>
      <div className="transaction__info">
        <p
          className={
            amount > 0
              ? "transaction__info-value-positive"
              : "transaction__info-value"
          }
        >
          {amount > 0 ? `+$${amount}` : `$${amount}`}
        </p>
        <p className="transaction__info-date">{formattedDate}</p>
      </div>
    </li>
  );
};

export default OverviewTransaction;
