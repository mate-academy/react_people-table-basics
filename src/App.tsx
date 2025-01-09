import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { getActiveLink } from './utils/GetActiveLink';

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
            <NavLink to="/" className={getActiveLink}>
              Home
            </NavLink>

            <NavLink className={getActiveLink} to="/people">
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
