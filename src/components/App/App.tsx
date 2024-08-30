import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { URLS } from '../../enums/URLS';

export const App = () => {
  const isLinkActive = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
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
            <NavLink className={isLinkActive} to={URLS.home}>
              Home
            </NavLink>

            <NavLink className={isLinkActive} to={URLS.people}>
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
};
