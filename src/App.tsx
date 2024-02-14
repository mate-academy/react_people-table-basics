import classNames from 'classnames';
import './App.scss';
import { Outlet, NavLink } from 'react-router-dom';

const activeLink = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
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
          <NavLink className={activeLink} to="/">
            Home
          </NavLink>

          <NavLink
            className={activeLink}
            to="/people"
          >
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
