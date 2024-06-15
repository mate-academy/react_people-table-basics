import cn from 'classnames';
import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { RoutesName } from './types/RoutesName';

export const App = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn('navbar-item', { 'has-background-grey-lighter': isActive });
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
            <NavLink className={getLinkClass} to={RoutesName.home}>
              Home
            </NavLink>

            <NavLink className={getLinkClass} to={RoutesName.people}>
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
