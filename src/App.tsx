import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';

// const getLinkActive = ({ isActive }: { isActive: boolean }) =>
//   classNames('navbar-item', {
//     'is-has-background-grey-lighter': isActive,
//   });

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
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            Home
          </NavLink>

          <NavLink
            to="people"
            className={({ isActive }: { isActive: boolean }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
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
