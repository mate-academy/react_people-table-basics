import React from 'react';
import {
  Navigate, NavLink, Route, Routes,
} from 'react-router-dom';
import classNames from 'classnames';

import { PageNotFound } from './components/PageNotFound';
import { HomePage } from './HomePage/HomePage';
import { PeoplePage } from './PeoplePage/PeoplePage';

import './App.scss';

export const App: React.FC = () => (
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
            className={({ isActive }) => classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
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
          <Route index element={<HomePage />} />

          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path="/people/:personSlug" element={<PeoplePage />} />
          </Route>

          <Route path="/home" element={<Navigate replace to="/" />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
