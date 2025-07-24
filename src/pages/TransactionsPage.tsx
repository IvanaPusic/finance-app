import React, { useState } from "react";
import type { Sort, Transaction } from "../types";
import { useGlobal } from "../contexts/GlobalContext";
import sortByFilter from "../data/filteringData";
import "../scss/styles.scss";
import searchIcon from "../assets/images/search-icon.png";
import caretDown from "../assets/images/caret-down.png";
import leftCaret from "../assets/svgs/button-left-icon.svg";
import rightCaret from "../assets/svgs/button-right-icon.svg";
import whitePlusIcon from "../assets/svgs/plus-white.svg";
import { Timestamp } from "firebase/firestore";
import TransactionModal from "../components/transaction-modal/TransactionModal";
import SingleTransaction from "../components/transaction/SingleTransaction";

const TransactionsPage: React.FC = () => {
  const {
    transactions,
    transactionInput,
    handleInput,
    categorySelect,
    handleCategorySelect,
    allTransactions,
    sortBySelect,
    handleSortBySelect,
    buttons,
    currentPage,
    transactionsPerPage,
    handleDisplayTransactions,
  } = useGlobal();

  const [sortBy, setIsSortBy] = useState<Sort[]>(sortByFilter);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const categories = [
    ...new Set(
      allTransactions.map((transaction: Transaction) => transaction.category)
    ),
  ];

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  return (
    <main className="transactions-page">
      {isModalVisible && (
        <TransactionModal setIsModalVisible={setIsModalVisible} />
      )}

      <div className="transactions-page__title-container">
        <h1 className="transactions-page__title">Transactions</h1>
        <button
          onClick={() => setIsModalVisible(true)}
          className="transactions-page__add-transaction"
        >
          <img
            className="transactions-page__add-transaction-icon"
            src={whitePlusIcon}
            alt=""
          />
          <span>Add New Transaction</span>
        </button>
      </div>

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
              <select
                name="sort"
                id="sort"
                value={sortBySelect}
                onChange={(e) => handleSortBySelect(e)}
              >
                {sortBy.map(({ value: v, title }, index) => (
                  <option key={index} value={v}>
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
              <select
                name="category"
                id="category"
                value={categorySelect}
                onChange={(e) => handleCategorySelect(e)}
              >
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

          {paginatedTransactions.map((transaction: Transaction, index) => {
            const transactionsDate = (transaction.date as Timestamp).toDate();
            const formattedDate = transactionsDate.toLocaleDateString(
              "en-GB",
              dateOptions
            );

            return (
              <SingleTransaction
                key={index}
                transaction={transaction}
                formattedDate={formattedDate}
                transactionClass="transactions-page__list-row"
              />
            );
          })}
        </ul>

        <div className="transactions-page__pagination">
          <button
            className="transactions-page__pagination-prev"
            onClick={() =>
              currentPage > 1 && handleDisplayTransactions(currentPage - 1)
            }
          >
            <img src={leftCaret} alt="" />
            <span>Prev</span>
          </button>

          <div className="transactions-page__pagination-list">
            {buttons.map((btn, i) => (
              <button
                key={i}
                className={
                  currentPage === btn
                    ? "transactions-page__pagination-list-btn transactions-page__pagination-list-active"
                    : "transactions-page__pagination-list-btn"
                }
                onClick={() => handleDisplayTransactions(btn)}
              >
                {btn}
              </button>
            ))}
          </div>

          <button
            className="transactions-page__pagination-next"
            onClick={() =>
              currentPage < buttons.length &&
              handleDisplayTransactions(currentPage + 1)
            }
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
