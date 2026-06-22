import { Navigate, Routes, Route, NavLink } from 'react-router-dom';
import { NotFoundPage } from './types/NotFoundPage';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';

import './App.scss';

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
              `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
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
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
        </Routes>
        <div className="block">
          <div className="box table-container"></div>
        </div>
      </div>
    </main>
  </div>
);
