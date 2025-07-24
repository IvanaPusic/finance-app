import type { Pot } from "../../types";
import { Link } from "react-router-dom";
import jar from "../../assets/images/jar.png";
import caret from "../../assets/images/caret-right.png";
import "./pots.scss";

type Props = {
  pots: Pot[];
  savingsValue: number;
};

const Pots = ({ pots, savingsValue }: Props) => {
  return (
    <article className="pots">
      <div className="pots__container">
        <h2 className="pots__container-title">Pots</h2>
        <Link to="/pots" className="pots__link">
          <span>See details</span>
          <img src={caret} alt="" />
        </Link>
      </div>
      <div className="pots__content">
        <div className="pots__content-savings">
          <img src={jar} alt="" />
          <div>
            <p className="pots__content-savings-title">Total Saved</p>
            <p className="pots__content-savings-value">${savingsValue}</p>
          </div>
        </div>
        <div className="pots__content-total">
          {pots.slice(0, 4).map((pot: Pot) => {
            return (
              <div key={pot.name} className="pots__content-pot">
                <p className="pots__content-pot-title">{pot.name}</p>
                <p className="pots__content-pot-value">${pot.total}</p>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default Pots;
