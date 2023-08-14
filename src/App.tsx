import { Outlet, NavLink } from 'react-router-dom';
import './App.scss';
import { setNavLinkClassName } from './utils/classNamesSetter';

export const App = () => {
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
              className={({ isActive }) => setNavLinkClassName({ isActive })}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => setNavLinkClassName({ isActive })}
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
