import React from 'react';

import 'bulma';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <nav className="navbar">
    <NavLink
      to="/"
      exact
      className="navbar-item is-tab"

    >
      Home
    </NavLink>
    <NavLink to="people" className="navbar-item is-tab">
      People
    </NavLink>
  </nav>
);
