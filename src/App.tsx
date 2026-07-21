import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom';

import { getPeople } from './api';
import { Loader } from './components/Loader';
import { Person } from './types/Person';

import './App.scss';

function HomePage() {
  return <h1 className="title">Home Page</h1>;
}

function NotFoundPage() {
  return <h1 className="title">Page not found</h1>;
}

function Navbar() {
  return (
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
}

type PersonLinkProps = {
  person: Person | null;
  fallbackName?: string;
};

function PersonLink({ person, fallbackName }: PersonLinkProps) {
  if (!person) {
    return <>{fallbackName ?? null}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : undefined}
    >
      {person.name}
    </Link>
  );
}

type PeopleTableProps = {
  people: Person[];
  selectedSlug: string | null;
};

export function PeopleTable({ people, selectedSlug }: PeopleTableProps) {
  return (
    <div className="block">
      <div className="box table-container">
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
                key={person.slug}
                data-cy="person"
                className={selectedSlug === person.slug ? 'has-background-warning' : undefined}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {person.motherName ? (
                    person.mother ? (
                      <PersonLink person={person.mother} />
                    ) : (
                      <span>{person.motherName}</span>
                    )
                  ) : (
                    '-'
                  )}
                </td>

                <td>
                  {person.fatherName ? (
                    person.father ? (
                      <PersonLink person={person.father} />
                    ) : (
                      <span>{person.fatherName}</span>
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(false);

    getPeople()
      .then(response => {
        if (isMounted) {
          const peopleWithRelations = response.map(person => {
            const mother = response.find(
              candidate => candidate.name === person.motherName,
            );
            const father = response.find(
              candidate => candidate.name === person.fatherName,
            );

            return {
              ...person,
              mother: mother ?? undefined,
              father: father ?? undefined,
            };
          });

          setPeople(peopleWithRelations);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people.length > 0 && (
        <PeopleTable people={people} selectedSlug={slug ?? null} />
      )}
    </>
  );
}

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people/:slug?" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
