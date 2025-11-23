import './App.scss';

import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  const { pathname } = useLocation();

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
            <Link
              to="/"
              className={`navbar-item ${
                pathname === '/' ? 'has-background-grey-lighter' : ''
              }`}
            >
              Home
            </Link>

            <Link
              to="/people"
              className={`navbar-item ${
                pathname.startsWith('/people')
                  ? 'has-background-grey-lighter'
                  : ''
              }`}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
