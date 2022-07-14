import React from 'react';
import 'bulma';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Header: React.FC = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <NavLink
        className={({ isActive }) => (
          cn(
            'navbar-item',
            'is-tab',
            { 'is-active': isActive },
          )
        )}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (
          cn(
            'navbar-item',
            'is-tab',
            { 'is-active': isActive },
          )
        )}
        to="/people"
      >
        People
      </NavLink>
    </div>
  </nav>
);
