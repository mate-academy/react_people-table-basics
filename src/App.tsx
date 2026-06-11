import { Route, Routes, NavLink, Navigate } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { useState } from 'react';

export const App = () => {
  const [hasError, setHasError] = useState(false);

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
                isActive
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/people"
              className={({ isActive }) =>
                isActive
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/people"
              element={
                <PeoplePage hasError={hasError} setHasError={setHasError} />
              }
            />

            <Route
              path="/people/:slug"
              element={
                <PeoplePage hasError={hasError} setHasError={setHasError} />
              }
            />

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
