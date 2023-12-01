import React from 'react';
import { NavLink } from 'react-router-dom';
import { getNavLinkClass } from '../../_utils';

export const Navigation: React.FC = () => {
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
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
