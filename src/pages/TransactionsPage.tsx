import React, { useState } from "react";
import type { Sort, Transaction } from "../types";
import { useGlobal } from "../contexts/GlobalContext";
import sortByFilter from "../data/filteringData";

const TransactionsPage: React.FC = () => {
  const { transactions } = useGlobal();
  const [sortBy, setIsSortBy] = useState<Sort[]>(sortByFilter);

  const categories = [
    ...new Set(
      transactions.map((transaction: Transaction) => transaction.category)
    ),
  ];
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return (
    <main className="transactions-page">
      <h1 className="transactions-page__title">Transactions</h1>
      <div className="transactions-page__content">
        <form className="transactions-page__form">
          <div className="transactions-page__input-container">
            <label htmlFor="transactions"></label>
            <input
              type="text"
              id="transactions"
              name="transactions"
              placeholder="Search transaction"
            />
          </div>
          <div className="transactions-page__filter-container">
            <div className="transactions-page__sort-by">
              <label htmlFor="sort">Sort By</label>
              <select name="sort" id="sort">
                {sortBy.map((item: Sort) => {
                  const { id, value, title } = item;
                  return (
                    <option key={id} value={value}>
                      {title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="transactions-page__categories">
              <label htmlFor="category">Category</label>
              <select name="category" id="category">
                {categories.map((category: string, i: number) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
      <ul className="transactions-page__list">
        <li>
          <p>Recipient | Sender</p>
          <p>Category</p>
          <p>Transaction Date</p>
          <p>Amount</p>
        </li>
        {transactions.slice(0, 5).map((transaction: Transaction) => {
          const transactionsDate = new Date(transaction.date);
          const formatedDate = transactionsDate.toLocaleDateString(
            "en-GB",
            dateOptions
          );
          return (
            <li key={transaction.name} className="transactions-page__list-item">
              <div className="transactions-page__list-item-user">
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
    </main>
  );
};

export default TransactionsPage;
