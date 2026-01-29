import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import classNames from 'classnames';

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
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <section className="section">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/people/:slug?" element={<PeoplePage />}></Route>
        <Route path="/home" element={<Navigate to="/" replace />}></Route>
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        ></Route>
      </Routes>
    </section>
  </div>
);
