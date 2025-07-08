import React from "react";
import type { Budget } from "../types";
import { PieChart, ResponsiveContainer, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";
import caret from "../assets/images/caret-right.png";

type Props = {
  budgets: Budget[];
};

const Budgets = ({ budgets }: Props) => {
  const COLORS: string[] = ["#277C78", "#82C9D7", "#F2CDAC", "#626070"];

  return (
    <section className="budgets">
      <div className="budgets__container">
        <h2 className="budgets__container-title">Budgets</h2>
        <Link to="/budgets" className="budgets__container-link">
          <span>See Details</span>
          <img src={caret} alt="" />
        </Link>
      </div>
      <div className="budgets__chart-info">
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
                fill={COLORS[index]}
                stroke={COLORS[index]}
                fillOpacity={0.7}
                strokeWidth={4}
              />
            ))}
          </Pie>
        </PieChart>
        <ul className="budgets__categories">
          {budgets.map((budget) => {
            const { category, maximum } = budget;

            return (
              <li key={category} className="budgets__category">
                <span className="budgets__category-title">{category}</span>
                <span className="budgets__category-value">${maximum}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Budgets;
