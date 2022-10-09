import {
  NavLink, Route, Routes, Navigate,
} from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';
import { PeoplePage } from './Pages.tsx';

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
            className={({ isActive }) => classNames(
              'navbar-item', { 'has-background-grey-lighter': isActive },
            )}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => classNames(
              'navbar-item', { 'has-background-grey-lighter': isActive },
            )}
            to="people"
          >
            People
          </NavLink>

        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<h1 className="title">Home page</h1>} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
