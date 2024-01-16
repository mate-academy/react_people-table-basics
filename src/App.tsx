/* eslint-disable max-len */
import React from 'react';
import {
  Routes, Route, NavLink, Navigate,
} from 'react-router-dom';
import classNames from 'classnames';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import './App.scss';

interface NavLinkProps {
  isPending: boolean
  isActive: boolean
  isTransitioning: boolean
}

const getLinkClass = (prop: NavLinkProps) => classNames(
  'navbar-item',
  { 'has-background-grey-lighter': prop.isActive },
);

export const App: React.FC = () => (
  <div data-cy="app">
    <main className="section">
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="/"
          element={(
            <div className="container">
              <h1 className="title">Home Page</h1>
            </div>
          )}
        />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":personName" element={<PeoplePage />} />
        </Route>
        <Route
          path="*"
          element={(
            <h1 className="title">Page not found</h1>
          )}
        />
      </Routes>

      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="/people" className={getLinkClass}>
              People
            </NavLink>
          </div>
        </div>
      </nav>
    </main>
  </div>
);
