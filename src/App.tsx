import { Link, Outlet, useLocation } from 'react-router-dom';

import './App.scss';
import classNames from 'classnames';
import { useEffect } from 'react';

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add('has-navbar-fixed-top');
  }, []);

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
                className={classNames('navbar-item', {
                  'has-background-grey-lighter': location.pathname === '/',
                })}
              >
                <div>Home</div>
              </Link>

              <Link
                className={classNames('navbar-item', {
                  'has-background-grey-lighter':
                    location.pathname.startsWith('/people'),
                })}
                to="/people"
              >
                <div>People</div>
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
    </>
  );
};
