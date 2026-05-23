import classNames from 'classnames';
import './App.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

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
              to="people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <div className="block">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
