/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

import './App.scss';
import { useEffect, useState } from 'react';
import { Person } from './types';
import { getPeople } from './api';
import { ErrorMessage } from './types/ErrorMessage';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === '/';
  const isPeople = location.pathname.startsWith('/people');

  useEffect(() => {
    if (isPeople && people.length === 0) {
      setIsLoading(true);
      getPeople()
        .then(response => {
          if (response.length === 0) {
            setErrorMessage(ErrorMessage.NO_PEOPLE_ON_SERVER);
          } else {
            setPeople(response);
          }
        })
        .catch(() => setErrorMessage(ErrorMessage.OTHER_ERRORS))
        .finally(() => setIsLoading(false));
    }
  }, [isPeople]);

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
              className={`navbar-item ${isHome && 'has-background-grey-lighter'}`}
              to="/"
              onClick={() => {
                setPeople([]);
              }}
            >
              Home
            </Link>

            <Link
              className={`navbar-item ${isPeople && 'has-background-grey-lighter'}`}
              to="/people"
              onClick={() => {
                if (people?.length === 0) {
                  setIsLoading(true);
                }
              }}
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
            <Route path="/home" element={<Navigate to="/" replace={true} />} />
            <Route path="/people">
              <Route
                index
                element={
                  <PeopleTable
                    people={people}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route
                path=":slug"
                element={
                  <PeopleTable
                    people={people}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
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
