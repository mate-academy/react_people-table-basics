import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useParams,
  Link,
} from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from './api';
import { Person } from './types';

import './App.scss';

const PersonLink = ({
  name,
  slug,
  isFemale,
  people,
}: {
  name: string;
  slug?: string;
  isFemale?: boolean;
  people: Person[];
}) => {
  if (!name) {
    return <span>-</span>;
  }

  const personExists = people.some(person => person.name === name);

  if (personExists) {
    const linkSlug = slug || people.find(person => person.name === name)?.slug;

    return (
      <Link
        className={isFemale ? 'has-text-danger' : ''}
        to={`/people/${linkSlug}`}
      >
        {name}
      </Link>
    );
  }

  return <span>{name}</span>;
};

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setError(null);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}
            {!isLoading && !error && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && !error && people.length > 0 && (
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
                      className={classNames({
                        'has-background-warning': person.slug === slug,
                      })}
                    >
                      <td>
                        <PersonLink
                          name={person.name}
                          slug={person.slug}
                          isFemale={person.sex === 'f'}
                          people={people}
                        />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        <PersonLink
                          name={person.motherName || ''}
                          slug={person.mother?.slug}
                          isFemale={true}
                          people={people}
                        />
                      </td>
                      <td>
                        <PersonLink
                          name={person.fatherName || ''}
                          slug={person.father?.slug}
                          isFemale={false}
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
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h1 className="title">Home Page</h1>
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h1 className="title">Page not found</h1>
    </div>
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
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </div>
);
