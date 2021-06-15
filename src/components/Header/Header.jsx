import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav className="navbar tabs">
      <ul>
        <li>
          <NavLink
            to="/"
            exact
            className="navbar-item is-tab"
            activeClassName="is-active"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navbar-item is-tab"
            activeClassName="is-active"
            to="/people"
          >
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
