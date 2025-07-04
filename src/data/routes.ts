import home from "../assets/svgs/home.png";
import budgets from "../assets/svgs/budgets.png";
import recurring from "../assets/svgs/recurring.png";
import pots from "../assets/svgs/pots.png";
import transactions from "../assets/svgs/transactions.png";
import homeActive from "../assets/svgs/home-active.png";
import budgetsActive from "../assets/svgs/budgets-active.png";
import recurringActive from "../assets/svgs/recurring-active.png";
import potsActive from "../assets/svgs/pots-active.png";
import transactionsActive from "../assets/svgs/transactions-active.png";

type Route = {
  pathName: string;
  path: string;
  icon: string;
  iconActive: string;
};

export const routes: Route[] = [
  {
    pathName: "Overview",
    path: "/",
    icon: home,
    iconActive: homeActive,
  },
  {
    pathName: "Transactions",
    path: "/transactions",
    icon: transactions,
    iconActive: transactionsActive,
  },
  {
    pathName: "Budgets",
    path: "/budgets",
    icon: budgets,
    iconActive: budgetsActive,
  },
  {
    pathName: "Pots",
    path: "/pots",
    icon: pots,
    iconActive: potsActive,
  },
  {
    pathName: "Recurring Bills",
    path: "/recurring-bills",
    icon: recurring,
    iconActive: recurringActive,
  },
];
