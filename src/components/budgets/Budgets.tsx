import type { Budget } from "../../types";
import { PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";
import caret from "../../assets/images/caret-right.png";
import BudgetCategory from "../budget-category/BudgetCategory";
import "./budgets.scss";

type Props = {
  layoutDirection?: "horizontal" | "vertical";
  budgets: Budget[];
};

const Budgets = ({ budgets, layoutDirection = "horizontal" }: Props) => {
  return (
    <section className={`budgets budgets--${layoutDirection}`}>
      <div className="budgets__container">
        <h2
          className={`budgets__container-title budgets__container-title--${layoutDirection}`}
        >
          Budgets
        </h2>
        <Link
          to="/budgets"
          className={`budgets__container-link budgets__container-link--${layoutDirection}`}
        >
          <span
            className={`budgets__see-details budgets__see-details--${layoutDirection}`}
          >
            See Details
          </span>
          <img src={caret} alt="" />
        </Link>
      </div>
      <div
        className={`budgets__chart-info budgets__chart-info--${layoutDirection}`}
      >
        <PieChart width={257} height={250}>
          <Pie
            data={budgets}
            cx={120}
            cy={120}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="maximum"
          >
            {budgets.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.theme}
                stroke={entry.theme}
                fillOpacity={0.7}
                strokeWidth={4}
              />
            ))}
          </Pie>
        </PieChart>
        <h2
          className={`budgets__summary-title budgets__summary-title--${layoutDirection}`}
        >
          Spending Summary
        </h2>
        <ul
          className={`budgets__categories budgets__categories--${layoutDirection}`}
        >
          {budgets.map((budget) => {
            const { category, maximum, theme } = budget;

            return (
              <BudgetCategory
                key={category}
                category={category}
                layoutDirection={layoutDirection}
                theme={theme}
                maximum={maximum}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Budgets;
