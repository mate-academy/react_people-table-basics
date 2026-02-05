import { NavLink, Route, Routes, Navigate } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { ErrorPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => (
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
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
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
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:personSlug" element={<PeoplePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
