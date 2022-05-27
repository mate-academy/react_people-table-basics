import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => (
  <nav className="navigation">
    <NavLink
      to="/"
      exact
      className="navigation__nav"
      activeClassName="is-active"
    >
      Home page
    </NavLink>

    <NavLink
      to="/"
      className="navigation__nav"
      activeClassName="is-active"
    >
      People page
    </NavLink>
  </nav>
);
