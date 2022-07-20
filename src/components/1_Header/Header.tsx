import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

export const Header: React.FC = () => {
  return (
    <>
      <nav className="nav">
        <NavLink
          to="/"
          className="nav__item"
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className="nav__item"
        >
          People Page
        </NavLink>
      </nav>
    </>
  );
};
