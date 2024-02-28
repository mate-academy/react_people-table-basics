import React from 'react';
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <nav className="navbar is-fixed-top mb-4 has-background-warning">
      <div className="navbar-start">
        <NavLink
          exact
          to="/"
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
          People Page
        </NavLink>
      </div>
    </nav>
  );
}
