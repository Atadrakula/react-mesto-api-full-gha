import { Link } from 'react-router-dom';
import HeaderBase from './HeaderBase';

function SignUpHeader() {
  return (
    <HeaderBase>
      <li>
        <Link to="/sign-in" className="header__link button-clickable">
          Войти
        </Link>
      </li>
    </HeaderBase>
  );
}

export default SignUpHeader;
