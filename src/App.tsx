import { HomePage } from './components/HomePage/HomePage';

import './App.scss';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeopleProvider } from './providers/PeopleProvider';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

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
            to="/people"
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
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
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/people">
            <Route
              index
              element={
                <PeopleProvider>
                  <PeoplePage />
                </PeopleProvider>
              }
            />
            <Route
              path=":slug"
              element={
                <PeopleProvider>
                  <PeoplePage />
                </PeopleProvider>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
