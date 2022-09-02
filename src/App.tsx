import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import { PeopleTable } from './components/PeopleTable';
import { Person } from './types';
import { getPeople } from './api';

export const App: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [personSlug, setPersonSlug] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
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
              className={({ isActive }) => (
                classNames(
                  'navbar-item',
                  { 'has-background-grey-lighter': isActive },
                )
              )}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => (
                classNames(
                  'navbar-item',
                  { 'has-background-grey-lighter': isActive },
                )
              )}
              to="people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route path="people">
              <Route
                index
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeopleTable
                      people={people}
                      isLoading={isLoading}
                      hasError={hasError}
                      // personSlug={personSlug}
                      // setPersonSlug={setPersonSlug}
                    />
                  </>
                )}
              />
              <Route
                path=":slug"
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeopleTable
                      people={people}
                      isLoading={isLoading}
                      hasError={hasError}
                    />
                  </>
                )}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
