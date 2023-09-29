import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';

export const App = () => {
  const isActiveLink = ({ isActive }: { isActive: boolean }) => (
    classNames('navbar-item',
      {
        'has-background-grey-lighter': isActive,
      })
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
            <NavLink className={isActiveLink} to="/">
              Home
            </NavLink>

            <NavLink
              className={isActiveLink}
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
