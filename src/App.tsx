/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Navigate, NavLink, Route, Routes,
} from 'react-router-dom';
import cn from 'classnames';

import './App.scss';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
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
              className={({ isActive }) => cn('navbar-item ',
                { 'has-background-grey-lighter': isActive })}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => cn('navbar-item ',
                { 'has-background-grey-lighter': isActive })}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />

            <Route path="/people">
              <Route
                index
                element={<PeoplePage />}
              />
              <Route
                path=":personSlug"
                element={<PeoplePage />}
              />
            </Route>

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
