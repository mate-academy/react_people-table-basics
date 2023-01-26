import {
  Navigate, NavLink, Outlet, Route, Routes,
} from 'react-router-dom';
// import { Loader } from './components/Loader';

import './App.scss';
import cn from 'classnames';
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
          <NavLink
            to="/"
            className={({ isActive }) => cn('navbar-item',
              { 'has-background-grey-lighter': isActive })}
          >
            Home
          </NavLink>

          <NavLink
            to="people"
            className={({ isActive }) => cn('navbar-item',
              { 'has-background-grey-lighter': isActive })}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="people"
            element={(
              <>
                <h1 className="title">People Page</h1>
                <Outlet />
              </>
            )}
          >
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
