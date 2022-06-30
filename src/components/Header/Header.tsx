import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => (
  <header className="header">
    <nav>
      <NavLink
        to="/"
        // eslint-disable-next-line
        className={({ isActive }) => isActive ? 'button is-warning'
          : 'button is-primary'}
      >
        Home
      </NavLink>
      <NavLink
        to="/people"
        // eslint-disable-next-line
        className={({ isActive }) => isActive ? 'button is-warning'
          : 'button is-primary'}
      >
        People
      </NavLink>
    </nav>
  </header>
);
