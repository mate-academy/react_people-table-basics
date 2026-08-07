import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>

            <NavLink to="/people" className={getNavLinkClass}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="section" style={{ marginTop: '50px' }}>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="people" element={<PeoplePage />} />
            <Route path="people/:slug" element={<PeoplePage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
