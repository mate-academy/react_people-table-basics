import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <nav className="header">
      <NavLink to="/" className="header__link">
        HOME
      </NavLink>

      <NavLink to="/people" className="header__link">
        PEOPLE
      </NavLink>
    </nav>
  );
};
