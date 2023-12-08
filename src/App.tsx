// import { Loader } from './components/Loader';

import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  const handleIsActive = ({ isActive }: { isActive: boolean }) => (
    classNames('navbar-item', { 'has-background-grey-lighter': isActive })
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
            <NavLink className={handleIsActive} to="/">
              Home
            </NavLink>

            <NavLink className={handleIsActive} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to=".." replace />} />
            <Route path="people" element={<PeoplePage />}>
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
