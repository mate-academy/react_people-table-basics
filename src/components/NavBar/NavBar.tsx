import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const NavBar = () => {
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
              cn('navbar-item', isActive && 'has-background-grey-lighter')
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              cn('navbar-item', isActive && 'has-background-grey-lighter')
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
