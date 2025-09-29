// Bloco Imports - reúne todas as importações
import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';

import PeoplePage from './components/PeoplePage';
import './App.scss';

// Bloco Pages - Home e NotFound
const HomePage: React.FC = () => (
  <div>
    <h1 className="title">Home Page</h1>
  </div>
);

const NotFoundPage: React.FC = () => (
  <div>
    <h1 className="title">Page not found</h1>
  </div>
);

// Bloco App - componente principal
export const App: React.FC = () => {
  return (
    <div data-cy="app">
      {/* Bloco Navbar - navigation bar */}
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
              end
              className={({ isActive }) =>
                isActive
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) =>
                isActive
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          {/* Bloco Routes - application routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
