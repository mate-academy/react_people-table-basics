import './App.scss';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const App = () => (
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
            className={({ isActive }) =>
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
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
