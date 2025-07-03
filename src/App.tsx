import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BudgetsPage from "./pages/BudgetsPage";
import OverviewPage from "./pages/OverviewPage";
import TransactionsPage from "./pages/TransactionsPage";
import PotsPage from "./pages/PotsPage";
import RecurringBillsPage from "./pages/RecurringBillsPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/pots" element={<PotsPage />} />
          <Route path="/recurring-bills" element={<RecurringBillsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
