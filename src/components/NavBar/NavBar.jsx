import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVLINKS } from '../../constants';

export const NavBar = () => (
  <nav
    className="navbar is-transparent is-spaced"
    style={{ marginBottom: '50px' }}
  >
    <ul className="navbar-brand">
      {NAVLINKS.map(navlink => (
        <li
          key={navlink.title}
          className="navbar-item"
        >

          <NavLink
            className="navbar-item"
            to={navlink.to}
            exact
            activeClassName="is-active"
          >
            {navlink.title}
          </NavLink>
        </li>
      ))}
      <li />
    </ul>
  </nav>
);
