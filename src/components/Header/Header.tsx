import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

type LinkStatus = (isActive: { isActive: boolean }) => string;

export const Header: React.FC = () => {
  const checkStatus: LinkStatus = ({ isActive }) => (
    isActive ? 'is-active header__nav-link' : 'header__nav-link'
  );

  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav-list">
          <NavLink
            to="/"
            className={checkStatus}
          >
            Home page
          </NavLink>

          <NavLink
            to="/people"
            className={checkStatus}
          >
            People page
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};
