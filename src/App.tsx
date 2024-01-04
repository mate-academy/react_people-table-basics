import { NavLink } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
import { Router } from './router/Router';

const getClassNames = (
  { isActive }:
  { isActive: boolean },
) => classNames('navbar-item', {
  'has-background-grey-lighter': isActive,
});

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
          <NavLink className={getClassNames} to="/">
            Home
          </NavLink>

          <NavLink
            className={getClassNames}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Router />
      </div>
    </main>
  </div>
);
