import './App.scss';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { isActive } from './utils/isActive';
import { useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();

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
                className={`navbar-item ${isActive(location.pathname, '/') ? 'has-background-grey-lighter' : ''}`}
                to="/"
              >
                Home
              </Link>

              <Link
                className={`navbar-item, ${isActive(location.pathname, '/people') ? 'has-background-grey-lighter' : ''}`}
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
              <Route path="/home" element={<Navigate to="/" replace />}></Route>
              <Route path="/" element={<HomePage />} />
              <Route path="/people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
