/* eslint-disable @typescript-eslint/no-unused-vars */
import { Loader } from './components/Loader';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

import './App.scss';
import { Outlet } from 'react-router-dom';

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
          <a className="navbar-item" href="#/">
            Home
          </a>

          <a
            className="navbar-item has-background-grey-lighter"
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>

    <main className="section">
      <Outlet />
    </main>
  </div>
);
