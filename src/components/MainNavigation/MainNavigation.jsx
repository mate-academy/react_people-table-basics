import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.scss';

export const MainNavigation = () => (
  <nav className="MainNavigation">
    <ul className="MainNavigation__list">
      <NavLink
        className="MainNavigation__link"
        activeClassName="is-active"
        to="/"
        exact
      >
        Home page
      </NavLink>

      <NavLink
        className="MainNavigation__link"
        activeClassName="is-active"
        to="/people"
      >
        People page
      </NavLink>
    </ul>
  </nav>
);
