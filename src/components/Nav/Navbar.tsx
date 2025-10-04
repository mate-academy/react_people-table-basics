import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getNavLinkClass = (isActive: boolean) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) => getNavLinkClass(isActive)}
            aria-label="Go to home page"
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => getNavLinkClass(isActive)}
            aria-label="Go to people page"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
