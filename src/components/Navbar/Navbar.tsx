import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const isActiveLink = (isActive: boolean) => {
    if (isActive) {
      return 'navbar-item has-background-grey-lighter';
    }

    return 'navbar-item';
  };

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
            to={'/'}
            className={({ isActive }) => isActiveLink(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to={'/people'}
            className={({ isActive }) => isActiveLink(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
