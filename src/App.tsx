import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';
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
        <div className="navbar-brand">
          <NavLink
            className={({ isActive }) =>
              cn('navbar-item', { 'has-background-grey-lighter': isActive })
            }
            to="home"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              cn('navbar-item', { 'has-background-grey-lighter': isActive })
            }
            to="people"
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
