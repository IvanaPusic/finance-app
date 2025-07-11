import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UidTracker: React.FC = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUid = localStorage.getItem("uid");
    if (!savedUid) return;
    if (savedUid) {
      logIn(savedUid);
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      setTimeout(() => {
        navigate(redirectPath);
      }, 0);
      console.log("UidTracker: ", redirectPath);
    }
  }, []);

  return null;
};

export default UidTracker;
