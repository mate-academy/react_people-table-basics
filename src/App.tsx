import React from 'react';
import cn from 'classnames';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.scss';

export const App: React.FC = () => {
  const location = useLocation();

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
                'has-background-grey-lighter': location.pathname === '/',
              })}
              to="/"
            >
              Home
            </Link>

            <Link
              className={cn('navbar-item', {
                'has-background-grey-lighter':
                  location.pathname.startsWith('/people'),
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
