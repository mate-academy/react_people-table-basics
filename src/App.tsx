import './App.scss';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import cn from 'classnames';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>

            <NavLink className={getLinkClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};
