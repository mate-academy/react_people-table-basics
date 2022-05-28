import { NavLink } from 'react-router-dom';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink
        exact
        to="/"
        className="navbar-item is-tab"
        activeClassName="is-active"
      >
        Home Page
      </NavLink>
      <NavLink
        className="navbar-item is-tab"
        to="/people"
        activeClassName="is-active"
      >
        People page
      </NavLink>
    </nav>
  );
};
