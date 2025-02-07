import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';

const getLinkActiveClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
          <NavLink className={getLinkActiveClass} to="/">
            Home
          </NavLink>

          <NavLink className={getLinkActiveClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <Outlet />
  </div>
);
