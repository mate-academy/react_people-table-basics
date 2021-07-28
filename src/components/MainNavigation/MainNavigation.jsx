import React from 'react';
import { NavLink } from 'react-router-dom';

import 'bulma';
import './MainNavigation.scss';

export const MainNavigation = () => (
  <nav className="navbar">
    <NavLink
      to="https://Artem20201610.github.io/react_people-table-basics/"
      className="navbar-item is-tab"
      activeClassName="is-active"
      exact
    >
      Home
    </NavLink>
    <NavLink
      to="https://Artem20201610.github.io/react_people-table-basics/people"
      className="navbar-item is-tab"
      activeClassName="is-active"
      exact
    >
      People
    </NavLink>
  </nav>
);
