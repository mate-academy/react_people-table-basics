import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav>
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <NavLink
          to="/"
          className={({ isActive }) => `navbar-item is-tab ${isActive ? 'is-active' : ''}`}
        >
          HomePage
        </NavLink>
        <NavLink
          to="/people"
          className={({ isActive }) => `navbar-item is-tab ${isActive ? 'is-active' : ''}`}
        >
          People page
        </NavLink>
      </div>
    </div>
  </nav>
);
