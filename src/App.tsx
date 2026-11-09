import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

import { HashRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';

import './App.scss';

export const App = () => {
  return (
    <HashRouter>
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
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};
