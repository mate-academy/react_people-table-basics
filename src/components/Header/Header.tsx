import React from 'react';

import { NavLink } from 'react-router-dom';

import './Header.scss';

export const Header: React.FC = () => (
  <nav className="navbar">
    <NavLink className="navbar__link" to="/">Home page</NavLink>
    <NavLink className="navbar__link" to="/people">People page</NavLink>
  </nav>
);
