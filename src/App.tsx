import './App.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

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
              className={classNames('navbar-item', {
                'has-background-grey-lighter': location.pathname === '/',
              })}
            >
              Home
            </Link>

            <Link
              to="/people"
              className={classNames('navbar-item', {
                'has-background-grey-lighter': location.pathname === '/people',
              })}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
