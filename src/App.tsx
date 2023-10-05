import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';

export const App = () => {
  const activeClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    );
  };

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
            {/* need to replace a to Link */}
            <NavLink
              to="/"
              className={activeClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/people"
              className={activeClass}
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
