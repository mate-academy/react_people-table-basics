import { NavLink } from 'react-router-dom';

export const Nav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          Home
        </NavLink>

        <NavLink className="navbar-item" to="/people">
          People
        </NavLink>

        {/* <a
          className="navbar-item has-background-grey-lighter"
          href="#/people"
        >
          People
        </a> */}
      </div>
    </div>
  </nav>
);
