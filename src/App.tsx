import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './App.scss';
import React from 'react';

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to="/" replace />;
  }

  return (
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
              to="/"
              className={({ isActive }) =>
                cn('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) =>
                cn('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
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
};
