import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from './components/Loader';
import { List } from './components/Loader/arrayList/list';
import { getPeople } from './api';
import { Person } from './types/Person';
import './App.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setTodos)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
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
              className={({ isActive }) =>
                cn('navbar-item', { 'has-background-grey-lighter': isActive })
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                cn('navbar-item', { 'has-background-grey-lighter': isActive })
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
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people">
              <Route
                path=":slug?"
                element={
                  <>
                    <h1 className="title">People Page</h1>
                    <div className="block">
                      <div className="box table-container">
                        {loading && <Loader />}

                        {errorMessage && (
                          <p
                            data-cy="peopleLoadingError"
                            className="has-text-danger"
                          >
                            Something went wrong
                          </p>
                        )}

                        {!loading && !errorMessage && todos.length === 0 && (
                          <p data-cy="noPeopleMessage">
                            There are no people on the server
                          </p>
                        )}

                        {!loading && !errorMessage && todos.length > 0 && (
                          <table
                            data-cy="peopleTable"
                            /* eslint-disable-next-line */
                            className="table is-striped is-hoverable is-narrow is-fullwidth"
                          >
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Sex</th>
                                <th>Born</th>
                                <th>Died</th>
                                <th>Mother</th>
                                <th>Father</th>
                              </tr>
                            </thead>
                            <List todos={todos} />
                          </table>
                        )}
                      </div>
                    </div>
                  </>
                }
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
