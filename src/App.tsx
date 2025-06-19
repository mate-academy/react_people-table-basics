import { Loader } from './components/Loader';
import './App.scss';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
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
            className={`navbar-item ${pathname === '/' ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </Link>

          <Link
            to="/people"
            className={`navbar-item ${pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  return <h1 className="title">Home Page</h1>;
};

const PersonLink = ({ personName, people }) => {
  if (!personName) {
    return '-';
  }

  const matchedPerson = people.find(person => person.name === personName);

  if (!matchedPerson) {
    return <>{personName}</>;
  }

  return (
    <Link
      to={`/people/${matchedPerson.slug}`}
      className={matchedPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {matchedPerson.name}
    </Link>
  );
};

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        const data = await response.json();

        setPeople(data);
      } catch {
        setError('Something went wrong');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}
              {!error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!error && people.length > 0 && (
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
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
                      return (
                        <tr
                          data-cy="person"
                          key={person.slug}
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
                              {person.name}
                            </Link>
                          </td>

                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          <td>
                            <PersonLink
                              personName={person.motherName}
                              people={people}
                            />
                          </td>
                          <td>
                            <PersonLink
                              personName={person.fatherName}
                              people={people}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const NotFoundPage = () => {
  return <h1 className="title">Page not found</h1>;
};

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
        </Routes>
      </div>
    </main>
  </div>
);
