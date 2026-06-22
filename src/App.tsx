import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

export const App = () => {
  return (
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
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container mt-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {/* <h1 className="title">Home Page</h1>
          <h1 className="title">People Page</h1>
          <h1 className="title">Page not found</h1> */}
        </div>
      </main>
    </div>
  );
};
