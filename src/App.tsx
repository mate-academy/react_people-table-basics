import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { RoutesPathes } from './helper/Routes';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink className={getLinkClass} to={RoutesPathes.HOME}>
            Home
          </NavLink>

          <NavLink className={getLinkClass} to={RoutesPathes.PEOPLE}>
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
