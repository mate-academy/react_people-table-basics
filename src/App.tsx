import './App.scss';

import cn from 'classnames';

import { NavLink, Outlet } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? 'darkgreen' : '',
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
          <NavLink to="/" className={getLinkClass} style={getLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/people" className={getLinkClass} style={getLinkStyle}>
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
