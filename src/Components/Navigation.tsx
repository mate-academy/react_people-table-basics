import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bulma/css/bulma.css';
import classNames from 'classnames';

export const Navigation: React.FC = () => (
  <header className="navbar">
    <nav className="navbar-menu">
      <NavLink
        to="/"
        className={(navData) => (classNames(
          'navbar-item',
          { 'is-active': navData.isActive },
        ))}
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className={(navData) => (classNames(
          'navbar-item',
          { 'is-active': navData.isActive },
        ))}
      >
        People page
      </NavLink>
    </nav>
  </header>
);
