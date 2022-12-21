import './App.scss';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

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
          <Link
            className="navbar-item"
            to="/"
          >
            Home
          </Link>

          <Link
            className="navbar-item has-background-grey-lighter"
            to="/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <h1 className="title">Page not found</h1>

        <Routes>
          <Route
            index
            element={<h1 className="title">Home Page</h1>}
          />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="people"
            element={<PeoplePage />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
