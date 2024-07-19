import { NavLink, Outlet } from 'react-router-dom';

import './App.scss';
import classNames from 'classnames';

export const App = () => {
  const isActiveNavButton = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
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
            <NavLink className={isActiveNavButton} to="/">
              Home
            </NavLink>

            <NavLink className={isActiveNavButton} to="/people">
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
};
