import {
  Routes, Route, Navigate, NavLink,
} from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './components/Loader';
import './index.css';
import {PeoplePage} from './components/PeoplePage';
import {HomePage} from './components/HomePage';
import {NotFoundPage} from './components/NotFoundPage';

export const App = () => (
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
            className={({ isActive }) => (
              classNames('navbar-item',
                { 'has-background-grey-lighter': isActive })
            )}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => (
              classNames('navbar-item',
                { 'has-background-grey-lighter': isActive })
            )}
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
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="/people"
            element={<PeoplePage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
