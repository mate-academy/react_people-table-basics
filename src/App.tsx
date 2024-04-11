import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import classNames from 'classnames';
import React from 'react';
import { Layout } from './components/Layout';

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

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
            <NavLink to="/" className={getLinkClassName}>
              Home
            </NavLink>

            <NavLink to="people" className={getLinkClassName}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":personId" element={<PeoplePage />} />
              </Route>

              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
