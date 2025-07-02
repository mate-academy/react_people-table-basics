import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
import { People } from './components/People/People';
import { Home } from './components/Home/Home';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

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

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="people/:personName?" element={<People />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
