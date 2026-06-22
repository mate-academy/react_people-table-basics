import { useEffect } from 'react';
import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = (isActive: boolean) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('has-navbar-fixed-top');
  }, []);

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
              className={({ isActive }) => getLinkClass(isActive)}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => getLinkClass(isActive)}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
