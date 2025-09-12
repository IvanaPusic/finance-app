import type { Transaction } from "../../types";

interface TransactionProps {
  transaction: Transaction;
  formattedDate: string;
  transactionClass: string;
}

const SingleTransaction = ({
  transaction,
  formattedDate,
  transactionClass,
}: TransactionProps) => {
  return (
    <li className={transactionClass}>
      <div className="transactions-page__user">
        {transaction.avatar && (
          <img src={transaction.avatar} alt={transaction.name} />
        )}
        <span>{transaction.name}</span>
      </div>
      <span className="transactions-page__user-category">
        {transaction.category}
      </span>
      <span>{formattedDate}</span>
      <span
        className={
          transaction.amount > 0
            ? "transactions-page__amount--positive"
            : "transactions-page__amount--negative"
        }
      >
        {transaction.amount > 0
          ? `+$${transaction.amount}`
          : `-$${Math.abs(transaction.amount)}`}
      </span>
    </li>
  );
};

export default SingleTransaction;
