import React from 'react'
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to = "/">Overview</Link>
          </li>
          <li>
            <Link to = "/transactions">Transactions</Link>
          </li>
          <li>
            <Link to = "/budgets">Budgets</Link>
          </li>
          <li>
            <Link to = "/pots">Pots</Link>
          </li>
          <li>
            <Link to = "/recurring-bills">Recurring bills</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation