import { Link } from 'react-router-dom';
import { routes } from "../data/routes";
import logo from "../assets/images/logo.svg";

const Navigation = () => {
  return (
    <header className='header'>
      <nav>
        <img src={logo} alt="" className="header__logo" />
        <ul className='header__links-list'>
          {
            routes.map(route => (
              <li key={route.pathName} className="header__links-list-item">
                <Link to={route.path} className='header__links-list-link'>
                  <img src={route.icon} alt="" className="icon icon--default" />
                  <img src={route.iconActive} alt="" className="icon icon--hover" />
                  <span>{route.pathName}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}

export default Navigation;
