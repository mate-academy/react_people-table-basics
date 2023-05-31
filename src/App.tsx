import {
  Route, Routes, NavLink, useLocation, Navigate,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  const { pathname } = useLocation();

  return (
    <div data-cy="app">
      {pathname === '/home' && <Navigate to="/" replace />}
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              className={({ isActive }) => `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`}
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
            <Route element={<HomePage />} path="/" />

            <Route element={<PeoplePage />} path="people" />
            <Route element={<PeoplePage />} path="people/:slug" />

            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </div>
      </main>
    </div>
  );
};
