import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <nav className="navbar is-fixed-top is-dark">
    <div className="navbar-brand">

      <NavLink
        to="/"
        exact
        className="navbar-item is-hoverable"
        activeClassName="is-active"
      >
        <div>Home</div>
      </NavLink>
      <NavLink
        to="/people"
        className="navbar-item is-hoverable"
        activeClassName="is-active"
      >
        <div>People</div>
      </NavLink>

    </div>
  </nav>
);
