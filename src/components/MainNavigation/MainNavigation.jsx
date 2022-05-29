import { NavLink } from 'react-router-dom';

export const MainNavigation = () => {
  return (
    <nav>
      <div className="navbar">
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
            className="navbar-item is-tab"
            activeClassName="is-active"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
