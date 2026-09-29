import {
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

const AppContent = () => {
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
              className={classNames('navbar-item', {
                'has-background-grey-lighter': pathname === '/',
              })}
              to="/"
            >
              Home
            </Link>

            <Link
              className={classNames('navbar-item', {
                'has-background-grey-lighter': pathname.startsWith('/people'),
              })}
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
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people/:slug?" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};
