import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

const getLinkStyle = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink className={getLinkStyle} to="/" end>
            Home
          </NavLink>

          <NavLink className={getLinkStyle} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Outlet></Outlet>
      </div>
    </main>
  </div>
);
