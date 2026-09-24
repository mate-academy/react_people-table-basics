import './App.scss';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { PageNotFound } from './PageNotFound';
import classNames from 'classnames';

export const App = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

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
                'has-background-grey-lighter': isActive('/'),
              })}
              to="/"
            >
              Home
            </Link>

            <Link
              className={classNames('navbar-item', {
                'has-background-grey-lighter': isActive('/people'),
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
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
