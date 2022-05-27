import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <>
      <div className="header">
        <NavLink
          to="/"
          exact
          className="header__link"
          activeClassName="header__link-activ"
        >
          Home Page
        </NavLink>

        <NavLink
          to="/people"
          exact
          className="header__link"
          activeClassName="header__link-activ"
        >
          People Page
        </NavLink>
      </div>
    </>
  );
};
