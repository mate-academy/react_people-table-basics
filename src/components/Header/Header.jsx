import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => (
  <div className="header">
    <nav className="nav">
      <NavLink
        to=""
        className={navData => (navData.isActive ? 'active' : '')}
      >
        Home
      </NavLink>
      <NavLink
        to="people"
        className={navData => (navData.isActive ? 'active' : '')}
      >
        People
      </NavLink>
    </nav>
  </div>
);
