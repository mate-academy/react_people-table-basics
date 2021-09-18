import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC<{}> = () => (
  <div className="Header">
    <NavLink
      to="/"
      className="Header__link"
      activeClassName="Header__link--active"
      exact
    >
      Home
    </NavLink>

    <NavLink
      to="/people"
      className="Header__link"
      activeClassName="Header__link--active"
    >
      People
    </NavLink>
  </div>
);
