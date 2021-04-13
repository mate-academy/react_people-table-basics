import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => (
  <nav
    className="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <NavLink
        activeClassName="is-active"
        className="navbar-item is-tab"
        to="/"
        exact
      >
        Home
      </NavLink>
      <NavLink
        activeClassName="is-active"
        className="navbar-item is-tab"
        to="/people"
      >
        People
      </NavLink>
    </div>
  </nav>
);
