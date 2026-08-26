import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
  useParams,
} from 'react-router-dom';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import { Person } from './types';
import './App.scss';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

const PersonLink = ({ person }: { person: Person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && people.length > 0 && (
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
                {people.map(person => {
                  const mother = people.find(p => p.name === person.motherName);
                  const father = people.find(p => p.name === person.fatherName);

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={
                        person.slug === slug ? 'has-background-warning' : ''
                      }
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {!person.motherName ? (
                          '-'
                        ) : mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          person.motherName
                        )}
                      </td>
                      <td>
                        {!person.fatherName ? (
                          '-'
                        ) : father ? (
                          <PersonLink person={father} />
                        ) : (
                          person.fatherName
                        )}
                      </td>
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
          <NavLink className={getNavClass} to="/">
            Home
          </NavLink>

          <NavLink className={getNavClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
