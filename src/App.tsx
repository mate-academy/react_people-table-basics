import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import {
  FC,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import './App.scss';
import { Loader } from './components/Loader';
import { Person } from './types';
import { getPeople } from './api';

const ROUTES = {
  home: '/',
  people: '/people',
};

const PageNavLink: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
      to={`${to}`}
    >
      {text}
    </NavLink>
  );
};

interface Props {
  to: string;
  text: string;
}

interface ParentProps {
  people: Person[];
  name: string;
  sex: 'f' | 'm';
}

const ParentLink: FC<ParentProps> = ({ people, name, sex }) => {
  const parent = people.find(person => person.name === name);
  const isPresent = !!parent;

  return (
    <td>
      {isPresent ? (
        <Link
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
          to={`${ROUTES.people}/${parent.slug}`}
        >
          {parent.name}
        </Link>
      ) : (name)}
    </td>
  );
};

const TodosPage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { activePerson } = useParams();

  const isReadyToShow = !isLoading && !isError;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(res => {
        setPeople(res);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">

      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError
            && !isLoading
            && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}

          {isReadyToShow && (
            <>
              {
                people.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <table
                    data-cy="peopleTable"
                    className="
    table is-striped
    is-hoverable
    is-narrow
    is-fullwidth"
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
                            /* eslint-disable-next-line */
                            'has-background-warning': activePerson === person.slug,
                          })}
                        >
                          <td>
                            <Link
                              to={`${ROUTES.people}/${person.slug}`}
                              className={classNames({
                                'has-text-danger': person.sex === 'f',
                              })}
                            >
                              {person.name}
                            </Link>
                          </td>
                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          {person.motherName ? (
                            <ParentLink
                              people={people}
                              name={person.motherName}
                              sex="f"
                            />
                          ) : (
                            <td>
                              -
                            </td>
                          )}
                          {person.fatherName ? (
                            <ParentLink
                              people={people}
                              name={person.fatherName}
                              sex="m"
                            />
                          ) : (
                            <td>
                              -
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink to={ROUTES.home} text="Home" />
          <PageNavLink to={ROUTES.people} text="People" />
        </div>
      </div>
    </nav>
  );
};

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <Routes>
        <Route
          path="*"
          element={
            <h1 className="title">Page not found</h1>
          }
        />
        <Route
          path="/home"
          element={
            <Navigate to="/" replace />
          }
        />
        <Route
          path="/"
          element={
            <h1 className="title">Home Page</h1>
          }
        />
        <Route
          path="/people"
          element={(
            <main className="section">
              <TodosPage />
            </main>
          )}
        >
          <Route
            index
            element={(
              <main className="section">
                <TodosPage />
              </main>
            )}
          />
          <Route
            path="/people/:activePerson"
            element={(
              <main className="section">
                <TodosPage />
              </main>
            )}
          />
        </Route>
      </Routes>
    </div>
  );
};
