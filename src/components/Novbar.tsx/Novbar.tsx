import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => (
  <nav data-cy="nav" className="navbar is-fixed-top has-shadow">
    <div className="container navbar-brand">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/people"
        className={({ isActive }) =>
          `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
        }
      >
        People
      </NavLink>
    </div>
  </nav>
);
