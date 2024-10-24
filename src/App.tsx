import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

export const App = () => {
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
              className={({ isActive }) => {
                return cn('navbar-item', {
                  'has-background-grey-lighter': isActive,
                });
              }}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => {
                return cn('navbar-item', {
                  'has-background-grey-lighter': isActive,
                });
              }}
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
