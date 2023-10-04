import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

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
            className={
              ({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className={
              ({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
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
        element={
          <NotFoundPage />
        }
      />
    </Routes>
  </div>
);
