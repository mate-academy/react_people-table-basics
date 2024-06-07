import './App.scss';
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to={'/'} />;
  }

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
            <NavLink to="/" className={getActiveLink}>
              Home
            </NavLink>

            <NavLink className={getActiveLink} to="/people">
              People
            </NavLink>
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
