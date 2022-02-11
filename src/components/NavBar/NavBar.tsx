import React from 'react';
import 'bulma';
import { NavLink } from 'react-router-dom';

export const NavBar: React.FC = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <NavLink
            to="/"
            className={({
              isActive,
            }) => `navbar-item is-tab ${isActive ? ' is-active' : ''}`}
          >
            Home Page
          </NavLink>

          <NavLink
            to="/people"
            className={({
              isActive,
            }) => `navbar-item is-tab ${isActive ? ' is-active' : ''}`}
          >
            People Page
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
