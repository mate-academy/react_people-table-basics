import { useEffect } from 'react';
import './App.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('has-navbar-fixed-top');

    return () => {
      document.documentElement.classList.remove('has-navbar-fixed-top');
    };
  }, []);

  const location = useLocation();

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
              className={`navbar-item ${location.pathname === '/' ? 'is-active has-background-grey-lighter' : ''}`}
            >
              Home
            </Link>

            <Link
              to="/people"
              className={`navbar-item ${location.pathname.startsWith('/people') ? 'is-active has-background-grey-lighter' : ''}`}
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
