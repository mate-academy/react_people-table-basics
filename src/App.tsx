import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App: React.FC = () => {
  const location = useLocation();

  const isHomeActive = location.pathname === '/';
  const isPeopleActive = location.pathname.startsWith('/people');

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
              className={`navbar-item ${isHomeActive ? 'has-background-grey-lighter' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/people"
              className={`navbar-item ${isPeopleActive ? 'has-background-grey-lighter' : ''}`}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
