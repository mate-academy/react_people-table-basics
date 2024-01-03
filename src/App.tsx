import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import cn from 'classnames';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => {
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
            <NavLink
              to="/"
              className={
                ({ isActive }) => cn('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              end
            >
              Home
            </NavLink>

            {/* className="navbar-item has-background-grey-lighter" */}
            <NavLink
              to="/people"
              className={
                ({ isActive }) => cn('navbar-item', {
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
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/people" element={<PeoplePage />} />
          </Routes>

        </div>
      </main>
    </div>
  );
};
