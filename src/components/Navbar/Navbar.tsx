import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={({ isActive }) => (
            isActive
              ? 'navbar-item has-background-grey-lighter'
              : 'navbar-item'
          )}
          to="/"
        >
          Home page
        </NavLink>

        <NavLink
          className={({ isActive }) => (
            isActive
              ? 'navbar-item has-background-grey-lighter'
              : 'navbar-item'
          )}
          to="/people"
        >
          People page
        </NavLink>
      </div>
    </div>
  </nav>
);
