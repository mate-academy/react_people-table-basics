import React from 'react';
import './Navigation.scss';
import { NavLink } from 'react-router-dom';

export const Navigation = () => (
  <>
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink
          to="/"
          exact
          className="navbar-item is-tab"
          activeClassName="is-active"
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className="navbar-item is-tab"
          activeClassName="is-active"
        >
          People
        </NavLink>
      </div>
    </nav>

  </>
);
