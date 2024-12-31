import './App.scss';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import cN from 'classnames';
import { PeopleTable } from './components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from './types';
import { getPeople } from './api';

function addParents(people: Person[]) {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(peopleItem => peopleItem.name === person.motherName),
      father: people.find(peopleItem => peopleItem.name === person.fatherName),
    };
  });
}

export const App = () => {
  const location = useLocation().pathname;
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(addParents(data));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
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
            <Link
              to="/"
              className={cN('navbar-item', {
                'has-background-grey-lighter': location === '/',
              })}
            >
              Home
            </Link>

            <Link
              className={cN('navbar-item', {
                'has-background-grey-lighter': location.startsWith('/people'),
              })}
              to="/people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route
                index
                element={
                  <PeopleTable
                    people={people}
                    isLoading={isLoading}
                    hasError={hasError}
                  />
                }
              />
              <Route
                path=":selectedUserSlug"
                element={
                  <PeopleTable
                    people={people}
                    isLoading={isLoading}
                    hasError={hasError}
                  />
                }
              />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
