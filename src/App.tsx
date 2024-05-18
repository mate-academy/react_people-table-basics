import { Outlet, NavLink } from 'react-router-dom';

import './App.scss';

const getElementClass = ({ isActive }: { isActive: boolean }) => {
  return `navbar-item ${isActive && 'has-background-grey-lighter'}`;
};

export const App = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink className={getElementClass} to="./" end>
              Home
            </NavLink>

            <NavLink className={getElementClass} to="./people">
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
};
