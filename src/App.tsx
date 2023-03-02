import { Outlet } from 'react-router-dom';

import './App.scss';
import { NavItem } from './components/NavItem';

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
          <NavItem
            to="/"
            title="Home"
          />

          <NavItem
            to="people"
            title="People"
          />
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
