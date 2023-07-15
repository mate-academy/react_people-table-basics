import { FC } from 'react';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const App: FC = () => {
  const getNavLinkClassName = (
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
            <NavLink
              className={getNavLinkClassName}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={getNavLinkClassName}
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
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="+" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
