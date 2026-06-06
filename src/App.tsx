import { Route, Routes, Navigate, NavLink } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

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
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<Navigate to="/" replace />}></Route>
        <Route path="/people" element={<PeoplePage />}></Route>
        <Route path="/people/:slug" element={<PeoplePage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </main>
  </div>
);
