import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import { Loader } from './components/Loader';

import './App.scss';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { Person } from './types';
import { getPeople } from './api';

export const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handelClickOnPeopleTable = () => {
    setLoading(true);
    getPeople()
      .then((persons) => setPeople(persons))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

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
              to="people"
              onClick={handelClickOnPeopleTable}
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
              path="home"
              element={<Navigate to="/" replace />}
            />

            <Route path="people">
              <Route
                index
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <div className="block">
                      <div className="box table-container">
                        {loading && <Loader />}

                        {error && (
                          <p
                            data-cy="peopleLoadingError"
                            className="has-text-danger"
                          >
                            Something went wrong
                          </p>
                        )}

                        {people?.length === 0 && (
                          <p data-cy="noPeopleMessage">
                            There are no people on the server
                          </p>
                        )}

                        {!loading && <PeopleTable people={people} />}
                      </div>
                    </div>
                  </>
                )}
              />

              <Route
                path=":personData"
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <div className="block">
                      <div className="box table-container">
                        {loading && <Loader />}

                        {!loading && <PeopleTable people={people} />}
                      </div>
                    </div>
                  </>
                )}
              />
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
