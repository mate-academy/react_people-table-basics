import { Outlet, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';

const getClassName = ({ isActive }: { isActive: boolean }) => classNames("navbar-item", { "has-background-grey-lighter" : isActive});

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
          <NavLink className={getClassName} to="/">
            Home
          </NavLink>

          <NavLink
            className={getClassName}
            to="/people"
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
