import { Navigate, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Loader } from './components/Loader';
import { Person } from './types/Person';

import './App.scss';

const PEOPLE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

const HomePage = () => <h1 className="title">Home Page</h1>;

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
          }
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

interface PersonLinkProps {
  person?: Person;
}

const PersonLink = ({ person }: PersonLinkProps) => {
  if (!person) {
    return null;
  }

  return (
    <NavLink
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </NavLink>
  );
};

interface PeopleTableProps {
  people: Person[];
  selectedPersonSlug?: string;
}

const PeopleTable = ({ people, selectedPersonSlug }: PeopleTableProps) => {
  const findPerson = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(person => person.name === name);
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
          const mother = findPerson(person.motherName);
          const father = findPerson(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === selectedPersonSlug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(PEOPLE_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load people');
        }

        return response.json();
      })
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
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
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

const PersonPage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Use useParams hook instead of window.location.hash
  const { slug } = useParams();

  useEffect(() => {
    fetch(PEOPLE_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load people');
        }

        return response.json();
      })
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  const selectedPerson = people.find(person => person.slug === slug);

  //if (!selectedPerson) {
  // return <NotFoundPage />;
  //}

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <PeopleTable
            people={people}
            selectedPersonSlug={selectedPerson?.slug}
          />
        </div>
      </div>
    </>
  );
};

// Removed <HashRouter> wrapper here since it is handled in index.tsx
export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people" element={<PeoplePage />} />

          <Route path="/people/:slug" element={<PersonPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
