import { Loader } from './components/Loader';
import './App.scss';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { getPeople } from './api';
import { useEffect, useState } from 'react';
import { Person } from './types';

const PersonLink = ({ person }: { person: Person }) => {
  return (
    <td>
      <Link
        className={person.sex === 'f' ? 'has-text-danger' : ''}
        to={`/people/${person.slug}`}
      >
        {person.name}
      </Link>
    </td>
  );
};

const People = () => {
  const [list, setList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const path = useLocation().pathname;

  useEffect(() => {
    getPeople()
      .then(people => {
        setList(people);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : hasError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : list.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <table
              data-cy="peopleTable"
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

              <tbody>
                {list.map(person => {
                  const mother = list.find(p => p.name === person.motherName);
                  const father = list.find(p => p.name === person.fatherName);

                  return (
                    <tr
                      data-cy="person"
                      key={person.name}
                      className={
                        path.includes(person.slug)
                          ? 'has-background-warning'
                          : ''
                      }
                    >
                      <td>
                        <Link
                          className={
                            person.sex === 'f' ? 'has-text-danger' : ''
                          }
                          to={`/people/${person.slug}`}
                        >
                          {person.name}
                        </Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      {mother ? (
                        <PersonLink person={mother} />
                      ) : (
                        <td>{person.motherName || '-'}</td>
                      )}
                      {father ? (
                        <PersonLink person={father} />
                      ) : (
                        <td>{person.fatherName || '-'}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export const App = () => {
  const location = useLocation();

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
            <Link
              className={
                location.pathname === '/'
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
              to={'/'}
            >
              Home
            </Link>
            <Link
              className={
                location.pathname.startsWith('/people')
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
              to={'/people'}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people" element={<People />} />
            <Route path="/people/:slug" element={<People />} />
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
