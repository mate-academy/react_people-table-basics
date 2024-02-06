import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
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
            className={({ isActive }) => classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
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
          <Route path="/">
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>

      </div>
    </main>
  </div>
);
