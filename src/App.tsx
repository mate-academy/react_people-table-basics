import {
  NavLink, Route, Navigate, Routes,
} from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

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
            className={({ isActive }) => (`navbar-item${isActive ? ' has-background-grey-lighter' : ''}`)}
          >
            Home
          </NavLink>

          <NavLink
            to="people"
            className={({ isActive }) => (`navbar-item${isActive ? ' has-background-grey-lighter' : ''}`)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
    <main className="section">
      <div className="container">
        <div className="block">
          <Routes>
            <Route path="people">
              <Route
                index
                element={<PeoplePage />}
              />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </main>
  </div>
);
