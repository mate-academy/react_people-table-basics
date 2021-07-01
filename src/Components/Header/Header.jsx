import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

export const Header = () => (
  <header className="header">
    <NavLink
      to="/Home"
      exact
      className="header__link"
      activeClassName="active"
    >
      Home
    </NavLink>

    <h1 className="main-title">People table</h1>

    <NavLink
      to="/people"
      className="header__link"
      activeClassName="active"
    >
      People
    </NavLink>
  </header>
);
