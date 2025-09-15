import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BudgetsPage from "./pages/budgets-page/BudgetsPage";
import OverviewPage from "./pages/overview-page/OverviewPage";
import TransactionsPage from "./pages/transactions-page/TransactionsPage";
import PotsPage from "./pages/pots-page/PotsPage";
import LoginPage from "./pages/login-page/LoginPage";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PageWrapper from "./components/page-wrapper/PageWrapper";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";
import SignupPage from "./pages/signup-page/SignupPage";
import PathTracker from "./components/path-tracker/PathTracker";
import UidTracker from "./components/uid-tracker/UidTracker";

function App() {
  return (
    <Router>
      <PageWrapper>
        <UidTracker />
        <PathTracker />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/pots" element={<PotsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageWrapper>
    </Router>
  );
}
export default App;
