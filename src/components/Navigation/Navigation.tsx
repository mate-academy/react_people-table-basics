import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const getNavClassName = (isActive: boolean) => {
    return classNames('navbar-item', {
      ' has-background-grey-lighter': isActive,
    });
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
            to="/"
            className={({ isActive }) => getNavClassName(isActive)}
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className={({ isActive }) => getNavClassName(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
