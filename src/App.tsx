import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import './App.scss';

export const App = () => {
  const getLinkClass = ({ isActive }:{ isActive: boolean }) => {
    return cn('navbar-item', { 'has-background-grey-lighter': isActive });
  };

  const location = useLocation();
  const isHome = location.pathname === '/home';

  if (isHome) {
    return <Navigate to="/" />;
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
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>

            <NavLink
              className={getLinkClass}
              to="/people"
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
