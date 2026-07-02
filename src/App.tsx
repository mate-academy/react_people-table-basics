import './App.scss';
import React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  const { pathname } = useLocation();

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
              className={`navbar-item ${pathname === '/' ? 'has-background-grey-lighter' : ''}`}
              to="/"
            >
              Home
            </Link>

            <Link
              className={`navbar-item ${pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
              to="/people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
