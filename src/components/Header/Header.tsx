import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header--nav">
        <NavLink
          className="link header--nav__link"
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className="link header--nav__link"
          to="/people"
        >
          People
        </NavLink>
      </nav>
    </header>
  );
};
