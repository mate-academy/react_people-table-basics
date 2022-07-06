import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="navigation">
        <NavLink
          to="/"
          className="
            tag
            is-primary
            navigation__item
            is-large"
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className="
            tag
            is-primary
            navigation__item
            is-large"
        >
          People
        </NavLink>
      </nav>
    </header>
  );
};
