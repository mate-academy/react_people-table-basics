import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  NavLink,
  useParams,
  Link,
  HashRouter,
} from 'react-router-dom';
import { Loader } from './components/Loader';
import { Person } from './types/Person';
import { getPeople } from './api';

import './App.scss';

const HomePage = () => (
  <div>
    <h1 className="title">Home Page</h1>
  </div>
);

type PersonLinkProps = {
  person: Person | null;
  name: string;
};

const PersonLink = ({ person, name }: PersonLinkProps) => {
  if (!name || name === null) {
    return <>-</>;
  }

  if (!person) {
    return <>{name}</>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link className={className} to={`/people/${person?.slug}`}>
      {name}
    </Link>
  );
};

type PeopleTableProps = {
  people: Person[];
  selectedPersonSlug: string | undefined;
};

const PeopleTable = ({ people, selectedPersonSlug }: PeopleTableProps) => {
  const findPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(person => person.name === name) || null;
  };

  return (
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
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedPersonSlug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={mother} name={person.motherName || ''} />
              </td>
              <td>
                <PersonLink person={father} name={person.fatherName || ''} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div>
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
            <PeopleTable people={people} selectedPersonSlug={slug} />
          )}
        </div>
      </div>
    </div>
  );
};

const NotFoundPage = () => (
  <div>
    <h1 className="title">Page not found</h1>
  </div>
);

export const App = () => (
  <HashRouter>
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
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
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
