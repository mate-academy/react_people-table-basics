import React from 'react';
import './Header.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className="navbar-item is-tab"
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className="navbar-item is-tab"
          >
            People
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
