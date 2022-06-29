import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar navbar-inverse">
        <NavLink to="/" className="btn btn-info navbar-btn">Home</NavLink>
        <NavLink to="/people" className="btn btn-primary navbar-btn">
          People
        </NavLink>
      </nav>
    </header>
  );
};
