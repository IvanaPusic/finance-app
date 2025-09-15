import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PathTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      localStorage.setItem("redirectPath", location.pathname);
    }
  }, [location.pathname]);

  return null;
};

export default PathTracker;
