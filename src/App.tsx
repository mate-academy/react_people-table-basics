import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './App.scss';
import cn from 'classnames';

export const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
            <Link
              className={cn('navbar-item', {
                'has-background-grey-lighter': currentPath === '/',
              })}
              to="/"
            >
              Home
            </Link>

            <Link
              className={cn('navbar-item', {
                'has-background-grey-lighter':
                  currentPath.startsWith('/people'),
              })}
              to="/people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
