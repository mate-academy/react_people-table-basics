import cn from 'classnames';
import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';

export const App = () => {
  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', { 'has-background-grey-lighter': isActive });

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
            <NavLink to="/" className={getNavLinkStyle}>
              Home
            </NavLink>

            <NavLink to="/people" className={getNavLinkStyle}>
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
