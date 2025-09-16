import { useState } from "react";
import type { Pot } from "../../types";
import breadcrumb from "../../assets/svgs/breadcrumb.png";

type Props = {
  pot: Pot;
};

const SinglePot = ({ pot }: Props) => {
  const { name, theme, target, total } = pot;
  const [progressValue, setProgressValue] = useState(
    (((total || 0) / target) * 100).toFixed(2)
  );

  return (
    <article className="pots-page__info-pot">
      <div className="pots-page__info-pot-container">
        <h2 className="pots-page__info-pot-title">
          <span
            className="pots-page__info-pot-indicator"
            style={{ backgroundColor: theme }}
          ></span>
          <span className="pots-page__info-pot-title">{name}</span>
        </h2>
      </div>
      <div className="pots-page__savings">
        <div className="pots-page__savings-total">
          <p className="pots-page__savings-total-title">Total Saved</p>
          <p className="pots-page__savings-total-value">${total}</p>
        </div>
        <progress
          data-theme={theme}
          value={progressValue}
          max={target}
        ></progress>
        <div className="pots-page__savings-info">
          <p className="pots-page__savings-info-percentage">
            {progressValue} %
          </p>
          <p className="pots-page__savings-info-target">Target of ${target}</p>
        </div>
      </div>
    </article>
  );
};

export default SinglePot;
