import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <nav className="Header">
    <NavLink
      to="/"
      exact
      className="Header"
      activeClassName="is-active"
    >
      Home page
    </NavLink>
    <NavLink
      to="/people"
      className="Header"
      activeClassName="is-active"
    >
      People page
    </NavLink>
  </nav>
);
