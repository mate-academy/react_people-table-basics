import { useEffect, useMemo, useState } from 'react';
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

import { Loader } from './components/Loader';
import { getPeople } from './api';
import { Person } from './types/Person';

import './App.scss';

const ACTIVE_NAV_LINK_CLASS = 'has-background-grey-lighter';
const SELECTED_PERSON_CLASS = 'has-background-warning';

type RequestStatus = 'idle' | 'pending' | 'resolved' | 'rejected';

const HomePage = () => <h1 className="title">Home Page</h1>;

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

const PersonLink = ({ person }: { person: Person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : undefined}
  >
    {person.name}
  </Link>
);

const PersonRelatives = ({
  name,
  people,
}: {
  name: string | null;
  people: Person[];
}) => {
  if (!name) {
    return <>-</>;
  }

  const relatedPerson = people.find(person => person.name === name);

  if (!relatedPerson) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${relatedPerson.slug}`}
      className={relatedPerson.sex === 'f' ? 'has-text-danger' : undefined}
    >
      {relatedPerson.name}
    </Link>
  );
};

const PeoplePage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [status, setStatus] = useState<RequestStatus>('idle');

  useEffect(() => {
    setStatus('pending');

    getPeople()
      .then(data => {
        setPeople(data);
        setStatus('resolved');
      })
      .catch(() => {
        setStatus('rejected');
      });
  }, []);

  const selectedSlug = slug ?? null;
  const selectedPerson = useMemo(
    () => people.find(person => person.slug === selectedSlug),
    [people, selectedSlug],
  );

  const shouldShowLoader = status === 'pending';
  const shouldShowError = status === 'rejected';
  const shouldShowNoPeople = status === 'resolved' && people.length === 0;
  const shouldShowTable = status === 'resolved' && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {shouldShowLoader && <Loader />}

          {shouldShowError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {shouldShowNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {shouldShowTable && (
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
                    className={
                      selectedPerson?.slug === person.slug
                        ? SELECTED_PERSON_CLASS
                        : undefined
                    }
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      <PersonRelatives
                        name={person.motherName}
                        people={people}
                      />
                    </td>
                    <td>
                      <PersonRelatives
                        name={person.fatherName}
                        people={people}
                      />
                    </td>
                  </tr>
                ))}
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
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar-item${isActive ? ` ${ACTIVE_NAV_LINK_CLASS}` : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) =>
              `navbar-item${isActive ? ` ${ACTIVE_NAV_LINK_CLASS}` : ''}`
            }
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
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
