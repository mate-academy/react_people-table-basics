/* eslint-disable object-curly-newline */
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import './App.scss';
import cn from 'classnames';

import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';

const setActiveClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
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
          <NavLink className={setActiveClass} to="/">
            Home
          </NavLink>

          <NavLink className={setActiveClass} to="/people">
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
            <Route path="home" element={<Navigate replace to="/" />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
