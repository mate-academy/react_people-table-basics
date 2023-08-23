import {
  Routes, Route, Navigate, NavLink,
} from 'react-router-dom';
import './App.scss';

import classNames from 'classnames';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const getClassForLinkPages = ({ isActive } : { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

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
          <NavLink to="/" className={getClassForLinkPages}>
            Home
          </NavLink>

          <NavLink to="/people" className={getClassForLinkPages}>
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":personLink" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
