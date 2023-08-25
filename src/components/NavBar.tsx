import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

function NavBar() {
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
            to="/"
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
