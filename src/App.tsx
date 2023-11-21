import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

export const App = () => {
  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

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
              className={getActiveLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={getActiveLinkClass}
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
