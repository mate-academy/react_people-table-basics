import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  const getLinkClass = (
    { isActive }: { isActive: boolean },
  ) => classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>

            <NavLink to="/people" className={getLinkClass}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>
              <Route path="home" element={<Navigate to=".." replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
