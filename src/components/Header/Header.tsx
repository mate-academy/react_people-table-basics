import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <NavLink
          to="/home"
          // eslint-disable-next-line
          className={({ isActive }) => isActive ?'button is-success' : 'button is-danger is-outlined'}
        >
          Home
        </NavLink>

        <NavLink
          to="/person"
          // eslint-disable-next-line
          className={({ isActive }) => isActive ?'button is-success' : 'button is-danger is-outlined'}
        >
          People
        </NavLink>
      </nav>
    </header>
  );
};
