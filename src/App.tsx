import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import cn from 'classnames';

import { HomePage } from './components/HomePage';

import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  const linkStyling = ({ isActive } : { isActive: boolean }) => (
    cn('navbar-item', { 'has-background-grey-lighter': isActive })
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
            <NavLink className={linkStyling} to="/">
              Home
            </NavLink>

            <NavLink
              className={linkStyling}
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
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug?" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
