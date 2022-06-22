import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="nav">
        <NavLink to="/" className="button is-link is-outlined">Home</NavLink>
        <NavLink to="/people" className="button is-primary is-outlined">
          People
        </NavLink>
      </nav>
    </header>
  );
};
