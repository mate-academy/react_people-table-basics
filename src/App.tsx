import './App.scss';
import {
  Navigate, Route, Routes, NavLink,
} from 'react-router-dom';
import classNames from 'classnames';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

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
              className={({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
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
              path="*"
              element={<PageNotFound />}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route path="people">
              <Route
                index
                element={<PeoplePage />}
              />

              <Route
                path=":personSlug"
                element={<PeoplePage />}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
