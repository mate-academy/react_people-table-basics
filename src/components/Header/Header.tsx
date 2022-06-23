import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item">
          <NavLink
            to="/"
            className={({ isActive }) => (
              isActive ? 'active' : undefined
            )}
          >
            Home
          </NavLink>
        </div>
        <div className="navbar-item">
          <NavLink
            to="/people"
            className={({ isActive }) => (
              isActive ? 'active' : undefined
            )}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
