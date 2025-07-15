import dots from "../assets/svgs/dots.svg";
import avatar from "../../public/avatars/james-thompson.png";
import type { Budget } from "../types";

type Props = { budget: Budget };

const BudgetCard = ({ budget }: Props) => {
  return (
    <div className="budget-card">
      <div className="budget-card__category-container">
        <div className="budget-card__category">
          <div
            style={{ backgroundColor: budget.theme }}
            className="budget-card__color-dot"
          ></div>
          <h2 className="budget-card__category-title">{budget.category}</h2>
        </div>
        <button className="budget-card__edit-budget">
          <img src={dots} alt="" />
        </button>
      </div>
      <div className="budget-card__maximum-container">
        <span className="budget-card__maximum-text">Maximum of</span>
        <span className="budget-card__maximum-amount">{` $${budget.maximum.toFixed(
          2
        )}`}</span>
      </div>
      <div className="budget-card__progress-bar budget-card__progress-bar--outer">
        <div
          style={{ backgroundColor: budget.theme }}
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
            <span className="budget-card__spent-amount">$15.00</span>
          </div>
        </div>
        <div className="budget-card__remaining">
          <div className="budget-card__remaining-marker"></div>
          <div className="budget-card__remaining-info">
            <span className="budget-card__remaining-title">Remaining</span>
            <span className="budget-card__remaining-amount">$35.00</span>
          </div>
        </div>
      </div>
      <div className="budget-card__latest-spending">
        <div className="budget-card__latest-title-container">
          <h2 className="budget-card__latest-title">Latest Spending</h2>
          <button className="budget-card__see-all">See All</button>
        </div>
        <ul className="budget-card__list">
          <li className="budget-card__item">
            <div className="budget-card__item-container">
              <div className="budget-card__personal-info">
                <img className="budget-card__avatar" src={avatar} alt="" />
                <span className="budget-card__name">James Thompson</span>
              </div>
              <div className="budget-card__transaction-info">
                <span className="budget-card__transaction-amount">-$5.00</span>
                <span className="budget-card__transaction-date">
                  11 Aug 2024
                </span>
              </div>
            </div>
            <div className="budget-card__border-div"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetCard;
