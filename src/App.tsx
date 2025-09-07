import cn from 'classnames';
import './App.scss';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();
  const isPeopleLocation = location.pathname.startsWith('/people');
  const isHomeLocation = location.pathname === '/';

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
              className={cn('navbar-item', {
                'has-background-grey-lighter': isHomeLocation,
              })}
            >
              Home
            </Link>

            <Link
              to="/people"
              className={cn('navbar-item', {
                'has-background-grey-lighter': isPeopleLocation,
              })}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          {/* {isPeopleLocation && <h1 className="title">People Page</h1>} */}

          <div className="block">
            <div className="box table-container">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
