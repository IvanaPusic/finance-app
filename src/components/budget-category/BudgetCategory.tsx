import React from "react";

interface BudgetCategoryProps {
  layoutDirection: string;
  theme: string;
  maximum: number;
  category: string;
}

const BudgetCategory = ({
  layoutDirection,
  theme,
  maximum,
  category,
}: BudgetCategoryProps) => {
  return (
    <li
      className={`budgets__category budgets__category--${layoutDirection}`}
      style={{ borderLeft: `5px solid ${theme}` }}
    >
      <span className="budgets__category-title">{category}</span>
      <span className="budgets__category-value">${maximum}</span>
    </li>
  );
};

export default BudgetCategory;
