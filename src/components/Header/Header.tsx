import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header>
    <nav className="nav">
      <NavLink to="/" className="nav__item">
        Home
      </NavLink>
      <NavLink to="/people" className="nav__item">
        People
      </NavLink>
    </nav>
  </header>
);

export default Header;
