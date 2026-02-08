/* eslint-disable @typescript-eslint/no-unused-vars */
import { Loader } from './components/Loader';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

import './App.scss';
import { Outlet, NavLink } from 'react-router-dom';

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
            to="/"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
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
