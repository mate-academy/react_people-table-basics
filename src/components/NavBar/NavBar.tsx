import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
            to="/"
            replace
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
