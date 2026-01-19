import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav data-cy="nav" className="navbar is-fixed-top has-shadow">
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          to="/"
          data-cy="nav-home"
          className={({ isActive }) =>
            `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          data-cy="nav-people"
          className={({ isActive }) =>
            `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
          }
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
