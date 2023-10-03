import './App.scss';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import cn from 'classnames';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/Pages/PeoplePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

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
            className={({ isActive }) => cn('navbar-item',
              { 'has-background-grey-lighter': isActive })}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => cn('navbar-item',
              { 'has-background-grey-lighter': isActive })}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />

          </Routes>

      </div>
    </main>
  </div>
);
