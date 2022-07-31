import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav-list">
          <NavLink
            to="/"
            className={({ isActive }) => (
              isActive ? 'is-active header__nav-link' : 'header__nav-link'
            )}
          >
            Home page
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => (
              isActive ? 'is-active header__nav-link' : 'header__nav-link'
            )}
          >
            People page
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};
