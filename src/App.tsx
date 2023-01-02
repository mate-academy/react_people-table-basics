import { useEffect, useState } from 'react';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { getPeople } from './api';
import { Person } from './types';
import { PeoplePage } from './pages/PeoplePage';

export const App: React.FC = () => {
  const [people, setAllVisiblePeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasEmptyTable, setHasEmptyTable] = useState(false);
  const [hasVisibleTable, setHasVisibleTable] = useState(false);

  const tableCheckHandler = () => {
    if (people.length === 0 && !hasError) {
      setHasEmptyTable(true);
    }

    if (!hasEmptyTable && !hasError) {
      setHasVisibleTable(true);
    }

    if (people.length > 0) {
      setHasEmptyTable(false);
    }
  };

  const loadPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setAllVisiblePeople(peopleFromServer);
      setIsLoading(false);

      tableCheckHandler();
    } catch {
      setHasError(true);
    }
  };

  useEffect(() => {
    setHasError(false);

    loadPeopleFromServer();
  }, [people]);

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
              className={({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
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
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage
                    isLoading={isLoading}
                    hasError={hasError}
                    hasEmptyTable={hasEmptyTable}
                    hasVisibleTable={hasVisibleTable}
                    people={people}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage
                    isLoading={isLoading}
                    hasError={hasError}
                    hasEmptyTable={hasEmptyTable}
                    hasVisibleTable={hasVisibleTable}
                    people={people}
                  />
                )}
              />
            </Route>
            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
