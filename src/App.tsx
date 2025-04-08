import React from 'react';
import './App.scss';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => {
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
              to="/"
              className={cn('navbar-item', {
                'has-background-grey-lighter': location.pathname === '/',
              })}
            >
              Home
            </Link>

            <Link
              to="/people"
              className={cn('navbar-item', {
                'has-background-grey-lighter':
                  location.pathname.startsWith('/people'),
              })}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
};
