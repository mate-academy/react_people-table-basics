import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, NavLink, Link } from 'react-router-dom';

import './App.scss';
import Home from './Home';
import PeoplePage from './PeoplePage';
import { getPeople } from './api';
import { Person } from './types';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [database, setDatabase] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(data => setDatabase(data))
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div data-cy="app">
        <nav
          data-cy="nav"
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <NavLink className="navbar-item" to="/">
                Home
              </NavLink>

              <NavLink
                className="navbar-item has-background-grey-lighter"
                to="/people"
              >
                People
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="section">
          <div className="container">
            <div className="block">
              <div className="box table-container">
                {isLoading && <Loader />}

                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>

                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>

                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable 
                  is-narrow is-fullwidth"
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

                  <tbody>
                    {database.map(person => {
                      return (
                        <tr data-cy="person" key={person.slug}>
                          <td>
                            <Link to={`/people/${person.slug}`}>
                              {person.name}
                            </Link>
                          </td>

                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          <td>{person.motherName || '-'}</td>
                          <td>{person.fatherName || '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route
            path="*"
            element={
              <div className="section">
                <div className="container">
                  <h1 className="title">Page not found</h1>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
};
