import classNames from 'classnames';

import './App.scss';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from './pages/HomaPage';

import { PeoplePage } from './pages/PeoplePage';

export const App = () => {
  const linkClassName = ({ isActive }: { isActive: boolean }) => classNames(
    'navbar-item',
    { 'has-background-grey-lighter': isActive },
  );

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
              className={linkClassName}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={linkClassName}
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
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":userSlug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
