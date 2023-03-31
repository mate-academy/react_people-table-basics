import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import { CustomNavLink } from './components/NavLink/CustomNavLink';
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
            <CustomNavLink to="/" label="Home" />

            <CustomNavLink to="/people" label="People" />
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

            <Route
              path="/people"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <PeoplePage />
                </>
              )}
            />

            <Route
              path="/people/:personId"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <PeoplePage />
                </>
              )}
            />

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
