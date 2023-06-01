import './App.scss';
import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import classNames from 'classnames';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

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
            className={
              ({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={
              ({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )
            }
            to="/people"
          >
            People
          </NavLink>

          {/* <a
            className="navbar-item has-background-grey-lighter"
            href="#/people"
          >
            People
          </a> */}
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
