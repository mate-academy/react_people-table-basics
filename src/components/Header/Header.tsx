import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <nav className="header">
      <NavLink to="/" className="header__link">
        <img
          src="https://img.icons8.com/cotton/64/000000/home--v3.png"
          alt="Home"
          className="header__link--image"
        />
      </NavLink>

      <NavLink to="/people" className="header__link">
        <img
          src="https://img.icons8.com/doodle/96/000000/crowd.png"
          alt="People"
          className="header__link--image"
        />
      </NavLink>
    </nav>
  );
};
