import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => (
  <nav>
    <div className="nav-wrapper purple darken-1">
      <ul className="hide-on-med-and-down">
        <li>
          <NavLink
            to="/"
            activeClassName="active"
            exact
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/people"
            activeClassName="active"
          >
            People
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);
