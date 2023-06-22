import classNames from 'classnames';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { PeoplePage } from './PeoplePage';

import './App.scss';

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
            className={
              ({ isActive }) => classNames('navbar-item',
                {
                  'has-background-grey-lighter': isActive,
                })
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={
              ({ isActive }) => classNames('navbar-item',
                {
                  'has-background-grey-lighter': isActive,
                })
            }
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">

        <Routes>
          <Route path="/" element={<h1 className="title">Home page</h1>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/people"
            element={<PeoplePage />}
          />
          <Route
            path="/people/:slug"
            element={<PeoplePage />}
          />

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </div>
    </main>
  </div>
);
