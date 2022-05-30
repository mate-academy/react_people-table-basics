import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

export const Header: React.FC = () => {
  const activeClassName = 'Header__is-active';

  return (
    <nav className="Header__navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (
          isActive ? activeClassName : 'Header__link')}
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className={({ isActive }) => (
          isActive ? activeClassName : 'Header__link')}
      >
        People
      </NavLink>
    </nav>
  );
};
