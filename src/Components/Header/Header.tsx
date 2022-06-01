import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

export const Header: React.FC = React.memo(() => {
  return (
    <nav className="Header__navbar">
      <NavLink
        to="/"
        className="Header__link"
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className="Header__link"
      >
        People
      </NavLink>
    </nav>
  );
});
