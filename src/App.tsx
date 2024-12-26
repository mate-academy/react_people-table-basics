import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import { getLinkClass } from './utils/getLinkClass';
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
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <div className="block">
          <Outlet />
        </div>
      </div>
    </main>
  </div>
);
