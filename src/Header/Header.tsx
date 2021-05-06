import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <NavLink
          to="/"
          className="navbar-item is-tab"
          activeClassName="is-active"
          exact
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className="navbar-item is-tab"
          activeClassName="is-active"
        >
          People
        </NavLink>
      </div>
    </div>
  );
};
