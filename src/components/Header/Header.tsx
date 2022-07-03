import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <header className="header">
    <nav className="navigation">
      <NavLink to="/home" className="tag is-primary navigation__item is-large">
        Home
      </NavLink>
      <NavLink to="/people" className="tag is-primary is-large">
        People
      </NavLink>
    </nav>
  </header>
);
