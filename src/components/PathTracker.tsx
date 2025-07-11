import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PathTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      localStorage.setItem("redirectPath", location.pathname);
      console.log("PathTracker");
    }
  }, [location.pathname]);

  return null;
};

export default PathTracker;
