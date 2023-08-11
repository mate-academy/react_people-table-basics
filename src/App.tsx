import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';

type IsActive = { isActive: boolean };

export const App = () => {
  const getClassNames = ({ isActive }: IsActive) => classNames(
    'navbar-item',
    { 'has-background-grey-lighter': isActive },
  );

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
            <NavLink
              className={getClassNames}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={getClassNames}
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
};
