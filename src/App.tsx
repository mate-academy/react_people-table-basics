import './App.scss';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/Loader/HomePage';
import NotFoundPage from './components/Loader/NotFoundPage';
import PeoplePage from './components/Loader/PeopplePage';

export const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/home' && <Navigate to="/" replace />}

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
                className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
              >
                Home
              </Link>

              <Link
                to="/people"
                className={`navbar-item ${location.pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
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
