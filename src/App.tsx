import './App.scss';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './NotFoundPage';

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
                to="/"
                className={`navbar-item ${
                  location.pathname === '/' ? 'has-background-grey-lighter' : ''
                }`}
                data-cy="Nav-Home"
              >
                Home
              </Link>

              <Link
                to="/people"
                className={`navbar-item ${
                  location.pathname.startsWith('/people')
                    ? 'has-background-grey-lighter'
                    : ''
                }`}
                data-cy="Nav-People"
              >
                People
              </Link>
            </div>
          </div>
        </nav>

        <main className="section" style={{ paddingTop: '4.5rem' }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />{' '}
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
