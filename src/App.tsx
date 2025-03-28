import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PeoplePage from './pages/PeoplePage';

export const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
              className={`navbar-item ${currentPath === '/' ? 'has-background-grey-lighter' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/people"
              className={`navbar-item ${currentPath.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};
