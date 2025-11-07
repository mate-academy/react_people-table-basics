import React from 'react';
import { NavLink } from 'react-router-dom';

const ACTIVE_NAV_LINK_CLASS = 'has-background-grey-lighter';

export const Navbar: React.FC = () => (
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
            `navbar-item ${isActive ? ACTIVE_NAV_LINK_CLASS : ''}`
          }
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `navbar-item ${isActive ? ACTIVE_NAV_LINK_CLASS : ''}`
          }
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
