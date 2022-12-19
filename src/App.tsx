import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './components/Loader';
import { Person } from './types/Person';
import { getPeople } from './api';
import { PersonLink } from './components/PersonLink/PersonLink';

import './App.scss';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadigError] = useState(false);

  const activeLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    );
  };

  useEffect(() => {
    const loadUsers = async () => {
      setHasLoadigError(false);
      setIsLoading(true);

      try {
        const peopleFromServer = await getPeople();

        setIsLoading(false);
        setPeople(peopleFromServer);
      } catch (error) {
        setIsLoading(false);
        setHasLoadigError(true);
      }
    };

    loadUsers();
  }, []);

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
            <NavLink
              className={activeLink}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={activeLink}
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
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route
              path="/people"
              element={<h1 className="title">People Page</h1>}
            />
            <Route
              path="/people/*"
              element={<h1 className="title">People Page</h1>}
            />
            <Route
              path="/home"
              element={<Navigate to="/" />}
            />
            <Route
              path="/*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>

          <div className="block">
            <div className="box table-container">
              {isloading && <Loader />}

              {hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(people.length === 0 && !isloading && !hasLoadingError) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
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
                    {people.map(person => (
                      <PersonLink
                        person={person}
                        people={people}
                        key={person.slug}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
