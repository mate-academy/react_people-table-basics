import './App.scss';

import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

const handleActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink to="/" className={handleActiveLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={handleActiveLinkClass}>
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
