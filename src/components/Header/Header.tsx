import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  const activeClassName = 'Header__is-active';

  return (
    <nav className="Header navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (
          isActive ? activeClassName : 'Header__link')}
      >
        HOME
        <img
          className="Header__icon"
          src="https://cdn-icons-png.flaticon.com/512/602/602275.png"
          width="25px"
          alt="link for home page"
        />
      </NavLink>

      <NavLink
        to="/people"
        className={({ isActive }) => (
          isActive ? activeClassName : 'Header__link')}
      >
        PEOPLE
        <img
          className="Header__icon"
          src="https://cdn-icons-png.flaticon.com/512/900/900783.png"
          alt="link for people page"
          width="25px"
        />
      </NavLink>
    </nav>
  );
};
