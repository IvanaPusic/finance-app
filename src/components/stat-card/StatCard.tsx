import React from "react";
import "./stat-card.scss";

type Props = {
  title: string;
  value: number | string;
  color?: string;
};

const StatCard = ({ title, value }: Props) => {
  return (
    <article className="stat-card">
      <h2 className="stat-card__title">{title}</h2>
      <p className="stat-card__value">{value}</p>
    </article>
  );
};

export default StatCard;
