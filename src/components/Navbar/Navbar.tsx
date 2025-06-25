import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

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
          to="/"
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
          end
          data-cy="homeLink"
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
          data-cy="peopleLink"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
