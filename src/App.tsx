import React, { useEffect, useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './components/Loader';

import './App.scss';

interface Person {
  id: number;
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
  slug: string;
}

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

// ========== Navbar ==========
const Navbar: React.FC = () => {
  const getClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" end className={getClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

// ========== PersonLink ==========
const PersonLink: React.FC<{
  name: string | null;
  people: Person[];
}> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </NavLink>
  );
};

// ========== PeopleTable ==========
const PeopleTable: React.FC<{
  people: Person[];
  selectedSlug?: string;
}> = ({ people, selectedSlug }) => {
  return (
    <div className="box table-container">
      {people.length === 0 ? (
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
            {people.map(person => (
              <tr
                key={person.id}
                data-cy="person"
                className={classNames({
                  'has-background-warning': person.slug === selectedSlug,
                })}
              >
                <td>
                  <NavLink
                    to={`/people/${person.slug}`}
                    className={person.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {person.name}
                  </NavLink>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  <PersonLink name={person.motherName} people={people} />
                </td>
                <td>
                  <PersonLink name={person.fatherName} people={people} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ========== Pages ==========
const HomePage: React.FC = () => <h1 className="title">Home Page</h1>;

const NotFoundPage: React.FC = () => <h1 className="title">Page not found</h1>;

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    fetch(API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network error');
        }

        return res.json();
      })
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !error && (
          <PeopleTable people={people} selectedSlug={slug} />
        )}
      </div>
    </div>
  );
};

// ========== App ==========
export const App: React.FC = () => (
  <HashRouter>
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  </HashRouter>
);
