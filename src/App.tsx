import './App.scss';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';

export const App = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <>
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
                className={`navbar-item ${isActive('/') ? 'has-background-grey-lighter' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/people"
                className={`navbar-item ${isActive('/people') ? 'has-background-grey-lighter' : ''}`}
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
              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":tabId" element={<PeoplePage />} />
              </Route>
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
