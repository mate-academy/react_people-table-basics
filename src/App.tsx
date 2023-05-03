import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import classNames from 'classnames';

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
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
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
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=':personSlug' element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
