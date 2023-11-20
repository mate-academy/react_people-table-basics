import './App.scss';

import { NavLink, Outlet } from 'react-router-dom';

import cn from 'classnames';

export const App = () => {
  const isActiveClass = ({ isActive }: { isActive: boolean }) => (
    cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })
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
              className={isActiveClass}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={isActiveClass}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
