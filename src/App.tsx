import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';

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
          {/* need to replace a to Link */}
          <NavLink
            to="/"
            className={
              ({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className={
              ({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            PeoplePage
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
