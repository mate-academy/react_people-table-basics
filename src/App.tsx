import React from 'react';
import classNames from 'classnames';

import './App.scss';
import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import { People } from './components/People/People';

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
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route
              index
              element={(
                <People />
              )}
            />

            <Route
              path=":userSlug"
              element={(
                <People />
              )}
            />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
