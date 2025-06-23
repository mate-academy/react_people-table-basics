import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';

const isActiveNavbar = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';

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
          <NavLink className={isActiveNavbar} to="/">
            Home
          </NavLink>

          <NavLink className={isActiveNavbar} to="/people">
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
