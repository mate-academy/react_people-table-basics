import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import './App.scss';
import { Person } from './types/Person';
import { PageNavLink } from './components/PageNavLink';
import { PeopleTable } from './components/PeopleTable';
import { LoadingError } from './components/LoadingError';

export const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState(false);

  const uploadPeople = async () => {
    try {
      const data = await getPeople();

      setPeople(data);
    } catch (err) {
      setError(true);
    }
  };

  uploadPeople();

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
            <PageNavLink to="/" text="Home" />
            <PageNavLink to="people" text="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />

          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route
              index
              element={(
                <div className="container">
                  <h1 className="title">People Page</h1>
                  {(!people && !error) && <Loader />}

                  {error && <LoadingError /> }

                  {people && <PeopleTable people={people} />}
                </div>
              )}
            />

            <Route
              path=":slug"
              element={(
                <div className="container">
                  <h1 className="title">People Page</h1>
                  {(!people && !error) && <Loader />}

                  {error && <LoadingError /> }

                  {people && <PeopleTable people={people} />}
                </div>
              )}
            />
          </Route>

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </main>
    </div>
  );
};
