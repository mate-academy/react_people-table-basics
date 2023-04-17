import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

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
              className={({ isActive }) => `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`}
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
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/home"
              element={
                <Navigate to="/" replace />
              }
            />

            <Route
              path="/people/"
            >
              <Route
                index
                element={<PeoplePage />}
              />

              <Route
                path=":selectedSlug"
                element={<PeoplePage />}
              />

            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

          </Routes>

        </div>
      </main>
    </div>
  );
};
