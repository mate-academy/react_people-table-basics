import cn from 'classnames';
import './App.scss';
import { Outlet, Link, useLocation } from 'react-router-dom';

export const App = () => {
  const { pathname } = useLocation();

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
                  'has-background-grey-lighter': pathname === '/',
                })}
              >
                Home
              </Link>

              <Link
                to="/people"
                className={cn('navbar-item', {
                  'has-background-grey-lighter': pathname.startsWith('/people'),
                })}
              >
                People
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
};
