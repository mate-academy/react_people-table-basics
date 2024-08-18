import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

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
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </div>
);
