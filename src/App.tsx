/* eslint-disable max-len */
import './App.scss';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

export const App = () => {
  const isActiveClass = ({ isActive }: { isActive: boolean }) => classNames('navbar-item', {
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
            <NavLink to="/" className={isActiveClass}>
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
