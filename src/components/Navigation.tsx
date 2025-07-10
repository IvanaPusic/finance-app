import { Link } from "react-router-dom";
import { routes } from "../data/routes";
import logo from "../assets/images/logo.svg";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { logOut } = useAuth();

  const logOutHandler = () => {
    logOut();
  };

  return (
    <header className="header">
      <nav>
        <img src={logo} alt="" className="header__logo" />
        <ul className="header__links-list">
          {routes.map((route) => (
            <li key={route.pathName} className="header__links-list-item">
              <Link to={route.path} className="header__links-list-link">
                <img src={route.icon} alt="" className="icon icon--default" />
                <img
                  src={route.iconActive}
                  alt=""
                  className="icon icon--hover"
                />
                <span>{route.pathName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={logOutHandler} className="header__logout">
        Log out
      </button>
    </header>
  );
};

export default Navigation;
