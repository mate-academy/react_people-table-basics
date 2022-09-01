import { useEffect, useState } from 'react';
import {
  Navigate,
  NavLink, Route, Routes,
} from 'react-router-dom';
import classNames from 'classnames';
import { PeoplesPage } from './components/PeoplesPage';
import { getPeople } from './api';
import { Person } from './types';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  const [peoples, setPeoples] = useState<Person[] | []>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPeople()
      .then(res => setPeoples(res))
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(true));
  }, []);

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
              className={({ isActive }) => classNames('navbar-item',
                { 'has-background-grey-lighter': isActive })}
              to="/"
              replace
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => classNames('navbar-item',
                { 'has-background-grey-lighter': isActive })}
              to="people"
              replace
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route
            path="*"
            element={
              <NotFoundPage />
            }
          />
          <Route
            path="/"
            element={<HomePage />}

          />
          <Route
            path="home"
            element={
              <Navigate to="/" replace />
            }

          />
          <Route path="people">
            <Route
              index
              element={(
                <PeoplesPage
                  peoples={peoples}
                  error={error}
                  isLoading={isLoading}
                />
              )}
            />
            <Route
              path=":peopleSlug"
              element={(
                <PeoplesPage
                  peoples={peoples}
                  error={error}
                  isLoading={isLoading}
                />
              )}
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
};
