import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import { activeLink } from './utils/activeLink';

export const App: React.FC = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={activeLink} to="..">
            Home
          </NavLink>

          <NavLink className={activeLink} to="people">
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
