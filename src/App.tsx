import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

import './App.scss';

export const Navbar = () => {
  return (
    <div className="navbar-brand">
      <NavLink
        to="/"
        className={({ isActive }) => (
          classNames('navbar-item', { 'has-background-grey-lighter': isActive })
        )}
      >
        Home
      </NavLink>

      <NavLink
        to="people"
        className={({ isActive }) => (
          classNames('navbar-item', { 'has-background-grey-lighter': isActive })
        )}
      >
        People
      </NavLink>
    </div>
  );
};

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Navbar />
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
