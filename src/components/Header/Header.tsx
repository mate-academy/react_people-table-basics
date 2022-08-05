import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <NavLink to="/" className="subtitle">HomePage</NavLink>
        <NavLink to="/people" className="subtitle">PeoplePage</NavLink>
      </nav>
    </header>
  );
};
