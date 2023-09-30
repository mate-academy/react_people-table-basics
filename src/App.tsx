import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => {
  const activeLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
    'navbar-item',
    { 'has-background-grey-lighter': isActive },
  );

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
              className={activeLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={activeLinkClass}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage />
          }
        />

        <Route
          path="/people"
          element={
            <PeoplePage />
          }
        />

        <Route
          path="/people/:personSlug"
          element={
            <PeoplePage />
          }
        />

        <Route
          path="/home"
          element={
            <Navigate to="/" replace />
          }
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
};
