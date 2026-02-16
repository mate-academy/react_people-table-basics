/* eslint-disable max-len */
import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.scss';

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
          <Outlet />
        </div>
      </main>
    </div>
  );
};
