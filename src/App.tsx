import classNames from 'classnames';
import './App.scss';
import {
  Navigate,
  Outlet,
  useLocation,
  NavLink,
} from 'react-router-dom';

const getClassLink = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to="/" replace />;
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
            <NavLink
              to="/"
              className={getClassLink}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={getClassLink}
            >
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
