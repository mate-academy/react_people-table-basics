import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
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
            className={
              ({ isActive }) => classNames(
                "navbar-item",
                { "has-background-grey-lighter": isActive }
              )
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={
              ({ isActive }) => classNames(
                "navbar-item",
                { "has-background-grey-lighter": isActive }
              )
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
