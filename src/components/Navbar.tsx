import { NavLink } from 'react-router-dom';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          exact
          to="/"
          className="navbar-item"
          activeClassName="navbar-item has-background-grey-lighter"
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className="navbar-item"
          activeClassName="navbar-item has-background-grey-lighter"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
