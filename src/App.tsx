import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';

import './App.scss';

import cn from 'classnames';

export const App: React.FC = () => {
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
                className={cn('navbar-item', {
                  'is-active has-background-grey-lighter':
                    location.pathname === '/',
                })}
              >
                Home
              </Link>

              <Link
                to="/people"
                className={cn('navbar-item', {
                  'is-active has-background-grey-lighter':
                    location.pathname.startsWith('/people'),
                })}
              >
                People
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
