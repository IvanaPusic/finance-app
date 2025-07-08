import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GuestRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();

  console.log("isLoggedIn in GuestRoute:", isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default GuestRoute;
