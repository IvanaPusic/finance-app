import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BudgetsPage from "./pages/BudgetsPage";
import OverviewPage from "./pages/OverviewPage";
import TransactionsPage from "./pages/TransactionsPage";
import PotsPage from "./pages/PotsPage";
import RecurringBillsPage from "./pages/RecurringBillsPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import PageWrapper from "./components/PageWrapper";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <Router>
      <PageWrapper>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/pots" element={<PotsPage />} />
            <Route path="/recurring-bills" element={<RecurringBillsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageWrapper>
    </Router>
  );
}
export default App;
