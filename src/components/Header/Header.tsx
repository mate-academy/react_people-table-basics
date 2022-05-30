import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

export const Header: React.FC = () => {
  return (
    <nav className="navbar is-dark">
      <div className="navbar-brand">
        <NavLink
          to="/"
          exact
          className="navbar-item"
          activeClassName="is-active"
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          exact
          className="navbar-item"
          activeClassName="is-active"
        >
          People
        </NavLink>
      </div>
    </nav>
  );
};
