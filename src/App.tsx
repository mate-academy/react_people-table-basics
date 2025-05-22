import './App.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const App = () => {
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
              className={`navbar-item ${location.pathname === '/' || location.pathname === '' ? 'navbar-item has-background-grey-lighter' : ''}`}
            >
              Home
            </Link>
            <Link
              to={`/people`}
              className={`navbar-item ${location.pathname.startsWith('/people') ? 'navbar-item has-background-grey-lighter' : ''}`}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};
