import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          to="/"
          className="navbar-item"
          activeClassName="has-background-grey-lighter"
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className="navbar-item"
          activeClassName="has-background-grey-lighter"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
