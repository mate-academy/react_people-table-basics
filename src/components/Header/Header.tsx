import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <header>
    <nav>
      <NavLink
        to="/"
      >
        Home
      </NavLink>
      {' '}
      <NavLink
        to="/people"
      >
        People page
      </NavLink>
    </nav>
  </header>
);
