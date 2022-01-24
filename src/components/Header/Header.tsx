import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

export const Header: React.FC = () => (
  <div className="Header">
    <nav className="Nav">
      <NavLink
        to="/"
        className={
          ({ isActive }) => (isActive ? 'Nav__link Nav__link--active' : 'Nav__link')
        }
        // active="selected"
        // className="Nav__link"
        // activeClassName="Nav__link--active"
      >
        Home
      </NavLink>
      <NavLink
        to="/people"
        className={
          ({ isActive }) => (isActive ? 'Nav__link Nav__link--active' : 'Nav__link')
        }
      >
        People
      </NavLink>
    </nav>
  </div>
);
