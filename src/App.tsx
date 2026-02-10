import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';
import './App.scss';

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  cn({
    'navbar-item': true,
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
          <NavLink to="/" className={getLinkClassName} data-cy="homeLink">
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={getLinkClassName}
            data-cy="peopleLink"
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
