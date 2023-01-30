import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navigation: React.FC = () => (
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
          className={({ isActive }) => cn(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) => cn(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
