import classNames from 'classnames';
import './App.scss';
import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';
import { PeoplePage } from './components/Pages/PeoplePage';

export const App = () => {
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item',
      { 'has-background-grey-lighter': isActive });
  };

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
            <NavLink className={getNavClass} to="/">
              Home
            </NavLink>

            <NavLink className={getNavClass} to="/people">
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

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>

        </div>
      </main>
    </div>
  );
};
