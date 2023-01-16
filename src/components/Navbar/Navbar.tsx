import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { makeActive } from '../../Navbar.helpers';

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
          className={makeActive}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={makeActive}
          to="people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
