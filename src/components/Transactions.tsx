import type { Transaction } from '../types'
import { Link } from 'react-router-dom';

type Props = {
  transactions: Transaction[];
}

const Transactions = ({ transactions }: Props) => {
  console.info("Transactions: ", transactions)
  return (
    <section className='transactions'>
      <div className="transactions-container">
        <h2>Transactions</h2>
        <Link to="/transactions">See details</Link>
      </div>
      <ul className="transactions__content">
        {
          transactions.slice(0,5).map((transaction: Transaction) => {
            return <li key={transaction.name} className='transactions__transaction'>
                <div className="transactions__transaction-user">
                  {transaction.avatar && <img src={transaction.avatar} alt={transaction.name} />}
                  <p className="transactions__transaction-user-name">{transaction.name}</p>
                </div>
                <div className="transactions__transaction-info">
                    <p className="transactions__transaction-info-value">{transaction.amount > 0 ? `+$${transaction.amount}` : `$${transaction.amount}` }</p>
                </div>
            </li>
          })
        }
      </ul>
    </section>
  )
}

export default Transactions