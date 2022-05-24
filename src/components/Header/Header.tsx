import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';
import cn from 'classnames';

export const Header: React.FC = React.memo(() => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={({ isActive }) => cn('navbar-item is-tab', {
                'is-active': isActive,
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) => cn('navbar-item is-tab', {
                'is-active': isActive,
              })}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
});
