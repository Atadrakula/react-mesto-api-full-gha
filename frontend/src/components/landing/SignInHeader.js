import { Link } from 'react-router-dom';
import HeaderBase from './HeaderBase';

function SignInHeader() {
  return (
    <HeaderBase>
      <li>
        <Link to="/sign-up" className="header__link button-clickable">
          Регистрация
        </Link>
      </li>
    </HeaderBase>
  );
}

export default SignInHeader;
