import './App.scss';

import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

export const App = () => {
  const getLinksClass = (
    { isActive }: { isActive: boolean },
  ) => cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
            <NavLink className={getLinksClass} to="/">
              Home
            </NavLink>

            <NavLink
              className={getLinksClass}
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
