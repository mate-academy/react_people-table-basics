import './App.scss';

import { NavLink, Outlet } from 'react-router-dom';
import { getNavLink } from './utils/getNavLink';

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
          <NavLink className={getNavLink} to="/">
            Home
          </NavLink>

          <NavLink className={getNavLink} to="/people">
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
