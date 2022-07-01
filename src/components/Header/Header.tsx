import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <nav className="navbar-menu">
      <NavLink
        to="/"
        className={classnames('navbar-link', { isActive: 'active' })}
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className={classnames('navbar-link', { isActive: 'active' })}
      >
        People
      </NavLink>
    </nav>
  );
};
