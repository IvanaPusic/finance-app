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
import x from "../assets/svgs/x.svg";
import avatarPlaceholder from "../../public/avatars/User.png";
import { Timestamp } from "firebase/firestore";
import { addTransaction } from "../firebase/dataManipulation";
import { useAuth } from "../contexts/AuthContext";

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

  const { currentUid } = useAuth();

  const [sortBy, setIsSortBy] = useState<Sort[]>(sortByFilter);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState<Transaction>({
    avatar: avatarPlaceholder,
    name: "",
    date: Timestamp.now(),
    category: "general",
    amount: 0,
    recurring: false,
  });

  const categories = [
    ...new Set(
      allTransactions.map((transaction: Transaction) => transaction.category)
    ),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maximum" ? parseFloat(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const date = new Date(value);
    const firebaseTimestamp = Timestamp.fromDate(date);
    console.log(firebaseTimestamp);
    setFormData((prev) => ({
      ...prev,
      [name]: firebaseTimestamp,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsModalVisible(false);
    addTransaction(currentUid, formData);
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  console.log("paginated transactions", paginatedTransactions);
  return (
    <main className="transactions-page">
      {isModalVisible && (
        <div
          className="transactions-page__modal-overlay"
          onClick={(e) => {
            setIsModalVisible(false);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="transactions-page__modal"
          >
            <div className="transactions-page__new-transaction-title-container">
              <h3 className="transactions-page__new-transaction-title">
                New Transaction
              </h3>
              <button
                onClick={() => {
                  setIsModalVisible(false);
                }}
                className="transactions-page__close-modal"
              >
                <img src={x} alt="" />
              </button>
            </div>
            <form
              className="transactions-page__new-transaction-form"
              onSubmit={handleSubmit}
              action=""
            >
              <label htmlFor="recipient-name">Recipient name</label>
              <input
                required
                className="transactions-page__new-transaction-input"
                type="text"
                name="name"
                id="recipient-name"
                onChange={handleChange}
              />
              <label htmlFor="category">Category</label>
              <input
                required
                className="transactions-page__new-transaction-input"
                type="text"
                name="category"
                id="category"
                onChange={handleChange}
              />
              <label htmlFor="date">Date</label>
              <input
                className="transactions-page__new-transaction-input transactions-page__new-transaction-input--date"
                type="date"
                name="date"
                id="date"
                onChange={handleDateChange}
              />
              <label htmlFor="amount">Amount</label>
              <input
                required
                className="transactions-page__new-transaction-input"
                type="number"
                name="amount"
                id="amount"
                onChange={handleChange}
              />
              <button
                className="transactions-page__new-transaction-button"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="transactions-page__title-container">
        <h1 className="transactions-page__title">Transactions</h1>
        <button
          onClick={() => {
            setIsModalVisible(true);
          }}
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
              <li key={index} className="transactions-page__list-row">
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
