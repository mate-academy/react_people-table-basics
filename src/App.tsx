import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';

import './App.scss';

export const HomePage = () => <h1 className="title">Home Page</h1>;

export const NotFoundPage = () => <h1 className="title">Page not found</h1>;

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
              className={
                pathname === '/'
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
              to="/"
            >
              Home
            </Link>

            <Link
              className={
                pathname.startsWith('/people')
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
              to="/people"
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
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
