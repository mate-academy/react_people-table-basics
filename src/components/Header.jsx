import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header>
    <h1 className="main-title">People table</h1>

    <nav className="navigation">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink
            to="/"
            exact
            className="nav-link"
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/people"
            className="nav-link"
            activeClassName="active"
          >
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
