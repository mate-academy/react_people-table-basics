import React from 'react';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

import './App.scss';

const setActiveClass = ({ isActive } : { isActive: boolean }) => classNames(
  'navbar-item',
  {
    'has-background-grey-lighter': isActive,
  },
);

export const App: React.FC = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={setActiveClass}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={setActiveClass}
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
