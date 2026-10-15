import classNames from 'classnames';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
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
          <NavLink className={getLinkClass} to="/" end>
            Home
          </NavLink>
          <NavLink className={getLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people/:slug?" element={<PeoplePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);
