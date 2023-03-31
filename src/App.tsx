import classNames from 'classnames';
import {
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage/Index';

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
                }))}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => (
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                }))}
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
              element={
                <h1 className="title">Home Page</h1>
              }
            />

            <Route
              path="/home"
              element={
                <Navigate to="/" replace />
              }
            />

            <Route path="/people">
              <Route
                index
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeoplePage />
                  </>
                )}
              />

              <Route
                path=":personId"
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeoplePage />
                  </>
                )}
              />
            </Route>

            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
