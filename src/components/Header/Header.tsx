import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav className="header">
      <NavLink to="/home" className="header__link">
        HOME
      </NavLink>

      <NavLink to="/people" className="header__link">
        PEOPLE
      </NavLink>
    </nav>
  );
};
