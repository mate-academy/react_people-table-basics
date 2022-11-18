import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleTable } from './components/PeopleTable';
import { PageNav } from './components/PageNav';
import { ErrorNotification } from './components/ErrorNotification';

import './App.scss';
import { Person } from './types/Person';
import { getPeople } from './api';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [isShownError, setIsShowError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((arr: Person[]) => {
        setPeople(arr);
        setIsPeopleLoading(true);
      })
      .catch(() => {
        setIsShowError(true);
        setIsPeopleLoading(true);
      });
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
            <PageNav to="/" text="Home" />
            <PageNav to="people" text="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={(
                <h1 className="title">Home Page</h1>
              )}
            />

            <Route
              path="/people"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <PeopleTable
                    people={people}
                    isPeopleLoading={isPeopleLoading}
                  />
                </>
              )}
            >
              <Route index />
              <Route path=":userId" />
            </Route>

            <Route
              path="*"
              element={(
                <h1 className="title">Page not found</h1>
              )}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
          </Routes>

          {isShownError && <ErrorNotification />}
        </div>
      </main>
    </div>
  );
};
