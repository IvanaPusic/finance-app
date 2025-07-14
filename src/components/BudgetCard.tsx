import dots from "../assets/svgs/dots.svg";

const BudgetCard: React.FC = () => {
  return (
    <div className="budget-card">
      <div className="budget-card__category-container">
        <div className="budget-card__category">
          <div className="budget-card__color-dot"></div>
          <h2 className="budget-card__category-title">Entertainment</h2>
        </div>
        <button className="budget-card__edit-budget">
          <img src={dots} alt="" />
        </button>
      </div>
      <div className="budget-card__maximum-container">
        <span className="budget-card__maximum-text">Maximum of</span>
        <span className="budget-card__maximum-amount">$50.00</span>
      </div>
    </div>
  );
};

export default BudgetCard;
