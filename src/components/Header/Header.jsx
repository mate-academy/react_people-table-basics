import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header className="header">
    <ul className="nav nav-pills">
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/"
          exact
        >
          Homepage
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/people">
          People
        </NavLink>
      </li>
    </ul>
  </header>
);
