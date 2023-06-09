import React from 'react';
import {
  Route, Routes, NavLink, Navigate, useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import { HomePage } from './components/HomePage';
import { People } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App: React.FC = () => {
  const location = useLocation();

  const isHomePage = location.pathname.endsWith('/home');

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
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
              replace
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (
                cn(
                  'navbar-item',
                  {
                    'has-background-grey-lighter': isActive,
                  },
                )
              )}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      {isHomePage && <Navigate to="/" replace />}
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route path="/people">
          <Route index element={<People />} />
          <Route path=":slug" element={<People />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
