import React from 'react';
import './App.scss';
import {
  NavLink, Route, Routes, Navigate,
} from 'react-router-dom';
import classNames from 'classnames';
import { Table } from './components/Table';

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
              className={({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/people"
              className={({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
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
              element={
                <h1 className="title">Home Page</h1>
              }
            />

            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route
                index
                element={
                  <Table />
                }
              />

              <Route
                path=":slug"
                element={
                  <Table />
                }
              />
            </Route>

            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
