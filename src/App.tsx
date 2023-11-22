import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

import './App.scss';

const getIsActive = ({
  isActive,
}: { isActive: boolean }) => (cn('navbar-item', {
  'has-background-grey-lighter': isActive,
}));

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
            className={getIsActive}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={getIsActive}
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
