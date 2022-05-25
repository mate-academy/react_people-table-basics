import { NavLink } from 'react-router-dom';
import './MainNavigation.scss';

export const MainNavigation = () => {
  return (
    <nav className="navbar is-primary is-spaced">
      <div className="navbar-brand">
        <NavLink
          to="/"
          exact
          className="navbar-item is-tab"
          activeClassName="is-active"
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          exact
          className="navbar-item is-tab"
          activeClassName="is-active"
        >
          People
        </NavLink>
      </div>
    </nav>
  );
};
