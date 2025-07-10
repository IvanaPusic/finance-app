import React, { useState } from "react";
import type { Sort, Transaction } from "../types";
import { useGlobal } from "../contexts/GlobalContext";
import sortByFilter from "../data/filteringData";
import "../scss/styles.scss";
import searchIcon from "../assets/images/search-icon.png";
import caretDown from "../assets/images/caret-down.png";
import leftCaret from "../assets/svgs/button-left-icon.svg";
import rightCaret from "../assets/svgs/button-right-icon.svg";

const TransactionsPage: React.FC = () => {
  const {
    transactions,
    handleNext,
    handlePrev,
    transactionInput,
    handleInput,
  } = useGlobal();
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
            <label htmlFor="transactions" />
            <input
              type="text"
              id="transactions"
              name="transactions"
              value={transactionInput}
              onChange={(event) => handleInput(event)}
              placeholder="Search transaction"
            />
            <img
              src={searchIcon}
              alt=""
              className="transactions-page__input-container-icon"
            />
          </div>

          <div className="transactions-page__filter-container">
            <div className="transactions-page__sort-by">
              <label htmlFor="sort">Sort By</label>
              <select name="sort" id="sort">
                {sortBy.map(({ id, value, title }) => (
                  <option key={id} value={value}>
                    {title}
                  </option>
                ))}
              </select>
              <img
                src={caretDown}
                alt=""
                className="transactions-page__sort-by-icon"
              />
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
              <img
                src={caretDown}
                alt=""
                className="transactions-page__categories-icon"
              />
            </div>
          </div>
        </form>

        <ul className="transactions-page__list">
          <li className="transactions-page__list-header">
            <span>Recipient | Sender</span>
            <span className="transactions-page__list-header-info">
              Category
            </span>
            <span className="transactions-page__list-header-info">
              Transaction Date
            </span>
            <span>Amount</span>
          </li>

          {transactions.slice(0, 10).map((transaction: Transaction) => {
            const formattedDate = new Date(transaction.date).toLocaleDateString(
              "en-GB",
              dateOptions
            );

            return (
              <li
                key={transaction.name}
                className="transactions-page__list-row"
              >
                <div className="transactions-page__user">
                  {transaction.avatar && (
                    <img src={transaction.avatar} alt={transaction.name} />
                  )}
                  <span>{transaction.name}</span>
                </div>
                <span>{transaction.category}</span>
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
          })}
        </ul>
        <div className="transactions-page__pagination">
          <button
            className="transactions-page__pagination-prev"
            onClick={handlePrev}
          >
            <img src={leftCaret} alt="" />
            <span>Prev</span>
          </button>
          <div className="transactions-page__pagination-list">
            {/* Dynamically add numbers based on how many array items are there */}
            <button className="transactions-page__pagination-list-btn">
              1
            </button>
            <button className="transactions-page__pagination-list-btn">
              2
            </button>
            <button className="transactions-page__pagination-list-btn">
              3
            </button>
            <button className="transactions-page__pagination-list-btn">
              4
            </button>
            <button className="transactions-page__pagination-list-btn">
              5
            </button>
          </div>
          <button
            className="transactions-page__pagination-prev"
            onClick={handleNext}
          >
            <span>Next</span>
            <img src={rightCaret} alt="" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;
