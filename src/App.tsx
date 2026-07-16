import React from 'react';
import { HomePage } from './components/componentsFiles/HomePage';
import {
  PageNotFound /** */,
} from './components/componentsFiles/ErrorMessages/PageNotFound';
import { PeoplePage } from './components/componentsFiles/PeoplePage';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';

import './App.scss';

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
              to={'/'}
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`.trim()
              }
            >
              Home
            </NavLink>

            <NavLink
              to={'/people'}
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`.trim()
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
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
