import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav className="header">
    <NavLink
      to="/"
      exact
      className="header__nav"
      activeClassName="is-active"
    >
      Home page
    </NavLink>

    <NavLink
      to="/people"
      exact
      className="header__nav"
      activeClassName="is-active"
    >
      People page
    </NavLink>
  </nav>
);
