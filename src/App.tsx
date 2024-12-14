import './App.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HomePage } from './components/HomePage';

const NLClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const App = () => {
  const { pathname } = useLocation();

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
            <NavLink className={NLClass} to="/">
              Home
            </NavLink>

            <NavLink className={NLClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          {pathname === '/' && <HomePage />}
          <Outlet />
        </div>
      </main>
    </div>
  );
};
