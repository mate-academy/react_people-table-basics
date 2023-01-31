import cn from 'classnames';
import React from 'react';
import {
  Navigate, NavLink, Route, Routes,
} from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App: React.FC = () => {
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
              end
              className={({ isActive }) => cn('navbar-item',
                { 'has-background-grey-lighter': isActive })}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              end
              className={({ isActive }) => cn('navbar-item',
                { 'has-background-grey-lighter': isActive })}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route
            path="/"
            element={(
              <div className="container">
                <h1 className="title">Home Page</h1>
              </div>
            )}
          />

          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="people"
            element={(
              <PeoplePage />
            )}
          />
          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </main>
    </div>
  );
};
