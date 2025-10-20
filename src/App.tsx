import { Link, Outlet, useLocation } from 'react-router-dom';

import './App.scss';

export const App: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isHomeActive = currentPath === '/' || currentPath === '/home';
  const isPeopleActive =
    currentPath === '/people' || currentPath.startsWith('/people/');

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
              className={`navbar-item ${isHomeActive ? 'has-background-grey-lighter' : ''}`}
            >
              Home
            </Link>

            <Link
              className={`navbar-item ${isPeopleActive ? 'has-background-grey-lighter' : ''}`}
              to="/people"
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
