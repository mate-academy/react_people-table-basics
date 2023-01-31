import cn from 'classnames';
import {
  Navigate, NavLink, Route, Routes,
} from 'react-router-dom';

// import { Loader } from './components/Loader';

import './App.scss';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

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
            end
            className={({ isActive }) => cn('navbar-item',
              { 'has-background-grey-lighter': isActive })}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            end
            className={({ isActive }) => cn('navbar-item',
              { 'has-background-grey-lighter': isActive })}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <Routes>
        <Route
          path="/"
          element={(
            <div className="container">
              <h1 className="title">Home Page</h1>
            </div>
          )}
        />

        <Route
          path="home"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="people"
          element={(
            <PeopleTable />
          )}
        />
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Routes>
    </main>
  </div>
);
