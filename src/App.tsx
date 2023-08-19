import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';

import cn from 'classnames';

export const App = () => {
  const navLinkIsActive = ({ isActive }: { isActive: boolean }) => (
    cn('navbar-item', { 'has-background-grey-lighter': isActive })
  );

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
            <NavLink className={navLinkIsActive} to="/">
              Home
            </NavLink>

            <NavLink
              className={navLinkIsActive}
              to="/people"
            >
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
};
