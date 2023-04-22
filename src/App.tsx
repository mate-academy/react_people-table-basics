import { FC, useEffect, useState } from 'react';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useMatch,
} from 'react-router-dom';
import cn from 'classnames';
import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';
import { Person } from './types/Person';
import { getPeople } from './api';
import './App.scss';

export const App: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [errLoad, setErrLoad] = useState(false);
  const isPeoplePage = useMatch('/people');

  useEffect(() => {
    if (isPeoplePage) {
      setIsLoader(true);
      getPeople()
        .then(result => setPeople(result))
        .catch(() => setErrLoad(true))
        .finally(() => setIsLoader(false));
    }
  }, [isPeoplePage]);

  const preparedPeople = () => {
    return people.map((person, _, arr) => {
      return {
        ...person,
        mother: arr.find(mom => mom.name === person.motherName),
        father: arr.find(dad => dad.name === person.fatherName),
      };
    });
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
            <NavLink
              className={({ isActive }) => cn(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => cn(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
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
              element={
                <h1 className="title">Home Page</h1>
              }
            />

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />

            <Route
              path="/people"
              element={
                (
                  <>
                    <h1 className="title">People Page</h1>

                    <div className="block">
                      <div className="box table-container">
                        {isLoader && <Loader />}

                        {errLoad && (
                          <p
                            data-cy="peopleLoadingError"
                            className="has-text-danger"
                          >
                            Something went wrong
                          </p>
                        )}

                        {!isLoader && !errLoad && !people.length && (
                          <p data-cy="noPeopleMessage">
                            There are no people on the server
                          </p>
                        )}

                        {isPeoplePage && !!people.length && (
                          <PeopleTable people={preparedPeople()} />
                        )}
                      </div>
                    </div>
                  </>
                )
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
