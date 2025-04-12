import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';

export const App = () => {
  interface Options {
    isActive: boolean;
  }

  const activeTab = ({ isActive }: Options) =>
    classNames('navbar-item', { ' has-background-grey-lighter': isActive });

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
            <NavLink to="/" className={activeTab}>
              Home
            </NavLink>
            <NavLink to="people" className={activeTab}>
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
