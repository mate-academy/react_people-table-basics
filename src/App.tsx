import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { useEffect, useState } from 'react';
import { PeopleTable } from './components/components/PeopleTable';
import { getPeople } from './api';
import { Person } from './types';
import { Navbar } from './components/components/Navbar';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div data-cy="app">
        <nav
          data-cy="nav"
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">

              <Navbar to="/" text="Home" />
              <Navbar to="/people" text="People" />
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
                path="home"
                element={
                  <Navigate to="/" replace />
                }
              />

              <Route path="people">
                <Route
                  index
                  element={(
                    <PeopleTable
                      isLoading={isLoading}
                      people={people}
                      error={error}
                    />
                  )}
                />
                <Route
                  path=":slug"
                  element={(
                    <PeopleTable
                      isLoading={isLoading}
                      people={people}
                      error={error}
                    />
                  )}
                />
              </Route>

              <Route
                path="*"
                element={
                  <h1 className="title">Page not found</h1>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
