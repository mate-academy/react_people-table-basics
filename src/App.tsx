import { Loader } from './components/Loader';
import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useParams,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import Person from './types/Person';

const HomePage = () => <h1 className="title">Home Page</h1>;

const NotFoundPage = () => {
  return <h1 className="title">Page not found</h1>;
};

const getApi = () => {
  return fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  ).then(result => {
    if (!result.ok) {
      throw new Error('Failed to load people');
    }

    return result.json();
  });
};

export const App = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const location = useLocation();

  const getData = async () => {
    try {
      const data = await getApi();

      setPeopleList(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const PeoplePage = () => {
    const { slug } = useParams();

    const findPersonByName = (name: string | null) => {
      return peopleList.find(person => person.name === name);
    };

    return (
      <div className="block">
        <h1 className="title">People Page</h1>

        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !hasError && peopleList.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && peopleList.length > 0 && (
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
                {peopleList.map(person => {
                  const mother = findPersonByName(person.motherName);
                  const father = findPersonByName(person.fatherName);

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={
                        person.slug === slug ? 'has-background-warning' : ''
                      }
                    >
                      <td>
                        <Link
                          to={`/people/${person.slug}`}
                          className={
                            person.sex === 'f' ? 'has-text-danger' : ''
                          }
                        >
                          {person.name || '-'}
                        </Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td>
                        {mother ? (
                          <Link
                            to={`/people/${mother.slug}`}
                            className="has-text-danger"
                          >
                            {mother.name}
                          </Link>
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>

                      <td>
                        {father ? (
                          <Link to={`/people/${father.slug}`}>
                            {father.name}
                          </Link>
                        ) : (
                          person.fatherName || '-'
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
    );
  };

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
              to="/"
              className={`navbar-item ${
                location.pathname === '/' ? 'has-background-grey-lighter' : ''
              }`}
            >
              Home
            </Link>

            <Link
              to="/people"
              className={`navbar-item ${
                location.pathname.startsWith('/people')
                  ? 'has-background-grey-lighter'
                  : ''
              }`}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people" element={<PeoplePage />} />

            <Route path="/people/:slug" element={<PeoplePage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
