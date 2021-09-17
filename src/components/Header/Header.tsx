import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav
      className="navbar is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <NavLink
        className="navbar-item has-text-black"
        to="/"
      >
        Home Page
      </NavLink>
      <NavLink
        className="navbar-item has-text-black"
        to="/people"
      >
        People Page
      </NavLink>
    </nav>
  );
}
