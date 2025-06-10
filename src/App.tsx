import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

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
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
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
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="people">
              <Route index element={<PeoplePage />}></Route>
              <Route path=":personSlug" element={<PeoplePage />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
