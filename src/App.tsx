import React from 'react';
import {
  NavLink, Outlet, HashRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
import { PeoplePage } from './components/PeoplePage';

const getClassNames = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item',
  { 'has-background-grey-lighter': isActive },
);

export const App: React.FC = () => (
  <Router>
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
              className={getClassNames}
            >
              Home
            </NavLink>
            <NavLink
              to="/people"
              className={getClassNames}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Outlet />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  </Router>
);
