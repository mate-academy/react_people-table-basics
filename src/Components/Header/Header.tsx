import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <header className="Header">
    <nav className="Header__nav">
      <NavLink
        className="Header__navlink"
        to="/"
        exact
      >
        Home page
      </NavLink>

      <NavLink
        className="Header__navlink"
        to="/people"
      >
        People page
      </NavLink>
    </nav>
  </header>
);
