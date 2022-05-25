import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => (
  <nav className="app__nav">
    <NavLink
      exact
      to="/"
      activeClassName="is-active"
      className="nav__link"
    >
      Home page
    </NavLink>
    <NavLink
      to="/people"
      activeClassName="is-active"
      className="nav__link"
    >
      People page
    </NavLink>
  </nav>
);

export default Nav;
