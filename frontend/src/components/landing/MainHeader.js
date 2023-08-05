import { useNavigate } from 'react-router-dom';
import HeaderBase from './HeaderBase';

function MainHeader({ email, onSignOut }) {
  const navigate = useNavigate();

  function signOut() {
    onSignOut();
    navigate('/sign-in');
  }

  return (
    <HeaderBase>
      <li>
        <div className='header__link-container'>
          <p className="header__email">{email}</p>
          <button onClick={signOut} className="header__button cursor-pointer button-clickable">Выйти</button>
        </div>
      </li>
    </HeaderBase>
  );
}

export default MainHeader;
