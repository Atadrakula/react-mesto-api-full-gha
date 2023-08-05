import { Link } from 'react-router-dom';
import logo from "../../images/Logo.svg";

function HeaderBase({ children }) {
  return (
    <header className="header">
      <ul className="header__links">
        <li>
          <Link to="/main">
            <img
              src={logo}
              alt="Логотип"
              className="logo button-clickable"
              id="logo"
            />
          </Link>
        </li>
        {children}
      </ul>
    </header>
  );
}

export default HeaderBase;

