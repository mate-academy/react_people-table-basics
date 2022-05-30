import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

export const Nav: React.FC = () => {
  const activeLink = 'nav__link nav__link--active';
  const inActiveLink = 'nav__link';

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : inActiveLink)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/people"
            className={({ isActive }) => (isActive ? activeLink : inActiveLink)}
          >
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
