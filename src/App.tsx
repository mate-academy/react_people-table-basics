import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

export const App = () => {
  const LinkClassIsActive = (isAtive: boolean) =>
    cn('navbar-item', { 'has-background-grey-lighter': isAtive });

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
              className={({ isActive }) => LinkClassIsActive(isActive)}
            >
              Home
            </NavLink>

            <NavLink
              to="people"
              className={({ isActive }) => LinkClassIsActive(isActive)}
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
