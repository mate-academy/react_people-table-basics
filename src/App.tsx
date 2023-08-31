import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import PeoplePage from './pages/PeoplePage';

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
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
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
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route path=":slug?" element={<PeoplePage />} />

          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
