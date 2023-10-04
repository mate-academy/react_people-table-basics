import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';

import './App.scss';
import { Home } from './components/Home';
import { PeopleTable } from './components/PeopleTable';
import { NotFoundPage } from './components/NotFoundPage';

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
            className={({ isActive }) => (isActive
              ? 'navbar-item has-background-grey-lighter'
              : 'navbar-item')}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive
              ? 'navbar-item has-background-grey-lighter'
              : 'navbar-item')}
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
          <Route path="/people" element={<PeopleTable />} />
          <Route path="/people/:slug" element={<PeopleTable />} />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/*" element={<NotFoundPage />} />

        </Routes>

      </div>
    </main>
  </div>
);
