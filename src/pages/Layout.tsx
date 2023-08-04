import React from 'react';
import cn from 'classnames';
import { Outlet, NavLink } from 'react-router-dom';

const Layout:React.FC = () => {
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
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
              to="people"
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

export default Layout;
