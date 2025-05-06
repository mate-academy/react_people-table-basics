import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.scss';

export const App = () => {
  const location = useLocation();

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
                className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
                to="/"
              >
                Home
              </Link>

              <Link
                className={`navbar-item ${location.pathname === '/people' ? 'has-background-grey-lighter' : ''}`}
                to="/people"
              >
                People
              </Link>
            </div>
          </div>
        </nav>

        <main className="section">
          <div className="container">
            <div className="block">
              <div className="box table-container">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
