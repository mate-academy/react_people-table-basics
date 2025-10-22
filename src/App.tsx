import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import classNames from 'classnames';

import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/Peoplepage';

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
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="people/:slug" element={<PeoplePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);
