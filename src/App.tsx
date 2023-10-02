import { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  Link, NavLink, Navigate, Route, Routes, useParams,
} from 'react-router-dom';
import { Loader } from './components/Loader';
import './App.scss';
import { getPeople } from './api';
import { Person } from './types';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

const nothing = '-';

const PeopleTable = ({ people }: { people: Person[] }) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {/* Table header */}
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
        {people.map((person: Person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link to={`/people/${person.slug}`} className={classNames({ 'has-text-danger': person.sex === 'f' })}>
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName
                && people.some(man => man.name === person.motherName) ? (
                  <Link
                    to={`/people/${people.find(man => man.name === person.motherName)?.slug || ''
                    }`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || nothing
                )}
            </td>
            <td>
              {person.fatherName
                && people.some(man => man.name === person.fatherName) ? (
                  <Link
                    to={`/people/${people.find(man => man.name === person.fatherName)?.slug || ''
                    }`}
                  >
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName || nothing
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching people data:', error);
        setIsLoading(false);
        setLoadingError(true);
      });
  }, []);

  return (
    <div data-cy="peoplePage">
      <h1 className="title">People Page</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {loadingError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : (
            <div>
              {people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={people} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

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
          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
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

            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/people/:slug" element={<PeoplePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  </div>
);
