import {
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';

import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

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
              className={({ isActive }) => (
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              )}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => (
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              )}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <div className="block">
            <div className="box table-container">
              {(window.location.hash === ''
              || window.location.hash === '#/home') && (
                <Navigate to="/" replace />
              )}

              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="people/:peopleSlug?">
                  <Route index element={<PeoplePage />} />
                  <Route path=":peopleSlug" element={<PeoplePage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
