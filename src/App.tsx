import {
  Outlet,
} from 'react-router-dom';

import { Navigation } from './components/Navigation/Navigation';

import './App.scss';

export const App = () => (
  <div data-cy="app">

    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Navigation />
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
