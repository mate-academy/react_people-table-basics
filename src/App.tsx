import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      {/* Navbar */}
      <nav data-cy="nav" className="navbar is-fixed-top has-shadow">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
          >
            People
          </NavLink>
        </div>
      </nav>

      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Головний маршрут для сторінки People + вкладений під slug */}
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </section>
    </div>
  );
};
