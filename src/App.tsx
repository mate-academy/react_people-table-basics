import cn from 'classnames';

import './App.scss';
import { Outlet, useLocation, Link } from 'react-router-dom';

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
              className={cn('navbar-item', {
                'has-background-grey-lighter': location.pathname === '/',
              })}
              to="/"
            >
              Home
            </Link>

            <Link
              className={cn('navbar-item', {
                'has-background-grey-lighter':
                  location.pathname.startsWith('/people'),
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
          <Outlet />
        </div>
      </main>
    </div>
  );
};
