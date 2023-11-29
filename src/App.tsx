import classNames from 'classnames';
import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item',
  { 'is-active': isActive },
);

export const App = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-light is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={getLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={getLinkClass}
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
