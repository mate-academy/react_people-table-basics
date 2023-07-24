import classNames from 'classnames';
import {
  Routes, Route, Navigate, NavLink,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

const getClassName = (
  { isActive }: { isActive: boolean },
) => classNames('navbar-item', {
  'has-background-grey-lighter': isActive,
});

export const App: React.FC = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getClassName}>
            Home
          </NavLink>

          <NavLink to="/people" className={getClassName}>
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />

          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
