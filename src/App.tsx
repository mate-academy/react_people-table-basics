import './App.scss';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import classNames from 'classnames';

export const App = () => {
  const matchHome = useMatch({ path: '/', end: true });
  const matchPeople = useMatch('/People/*');

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar has-shadow "
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              className={classNames('navbar-item ', {
                'has-background-grey-lighter': matchHome,
              })}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={classNames('navbar-item', {
                'has-background-grey-lighter': matchPeople,
              })}
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
