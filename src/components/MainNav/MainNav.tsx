import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNav.scss';

export const MainNav: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/home"
      >
        <img
          className="navbar__icon"
          src="https://info-otzyv.com/images/company_default.png"
          alt="link for home page"
        />
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) => (
          isActive ? 'navbar__is-active' : 'navbar__link')}
      >
        home
      </NavLink>

      <NavLink
        to="/people"
        className={({ isActive }) => (
          isActive ? 'navbar__is-active' : 'navbar__link')}
      >
        people
      </NavLink>
    </nav>
  );
};
