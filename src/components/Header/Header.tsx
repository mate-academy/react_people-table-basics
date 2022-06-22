import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav className="nav App__nav">
      <NavLink
        to="/"
        className="nav__link"
        style={({ isActive }) => {
          return {
            color: isActive ? 'red' : '',
          };
        }}
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className="nav__link"
        style={({ isActive }) => {
          return {
            color: isActive ? 'red' : '',
          };
        }}
      >
        People
      </NavLink>
    </nav>
  );
};
