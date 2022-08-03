import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <header>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink
            to="/"
            className={({ isActive }) => (
              `navbar-item is-tab ${isActive ? ' is-active' : ''}`
            )}
          >
            Home page
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => (
              `navbar-item is-tab ${isActive ? ' is-active' : ''}`
            )}
          >
            People page
          </NavLink>
        </div>
      </div>
    </nav>
  </header>
);
