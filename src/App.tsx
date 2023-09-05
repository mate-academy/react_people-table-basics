import { Outlet, NavLink } from 'react-router-dom';

import './App.scss';

const haveActive = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
};

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
            className={haveActive}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={haveActive}
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
