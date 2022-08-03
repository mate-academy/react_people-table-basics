import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Status = { isActive: boolean };

const getActiveClasses = (status: Status) => classNames(
  'navbar-item',
  { 'is-active': status.isActive },
);

export const Header = () => (
  <header className="navbar">
    <nav className="navbar-menu">
      <NavLink
        className={getActiveClasses}
        to="/"
      >
        Home page
      </NavLink>
      <NavLink
        className={getActiveClasses}
        to="/people"
      >
        People page
      </NavLink>
    </nav>
  </header>
);
