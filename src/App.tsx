import './App.scss';

import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

import cn from 'classnames';
import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';
import PeoplePage from './pages/PeoplePage';

const getLinkStatus = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
          <NavLink to="/" className={getLinkStatus}>
            Home
          </NavLink>

          <NavLink to="/people" className={getLinkStatus}>
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
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug" />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </main>
  </div>
);
