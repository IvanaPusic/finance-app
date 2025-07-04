import type { Pot } from '../types'
import { Link } from 'react-router-dom';
import jar from "../assets/images/jar.png";

type Props = {
  pots: Pot[];
  savingsValue: number;
}

const Pots = ({ pots, savingsValue }: Props) => {
  console.log("Pots", pots)
  console.log("Savings value $", savingsValue);

  return (
    <article className='pots'>
      <div className='pots__container'>
        <h2 className='pots__container-title'>Pots</h2>
        <Link to="/pots">See details</Link>
      </div>
      <div className='pots__content'>
        <div className="pots__content-savings">
          <img src={jar} alt="" />
          <div>
            <p className="pots__content-savings-title">Total Saved</p>
            <p className="pots__content-savings-value">${savingsValue}</p>
          </div>
        </div>
        <div className="pots__content-total">
          {
            pots.slice(0, 4).map((pot: Pot) => {
              return (
                <div key={pot.name}>
                  <p className="pots__content-total-title">{pot.name}</p>
                  <p className="pots__content-total-value">${pot.total}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </article>
  )
}

export default Pots
