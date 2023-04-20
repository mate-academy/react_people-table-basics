import { useEffect, useState } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { People } from './pages/People';
import { Person } from './types';
import { getPeople } from './api';
import { PageNavLink } from './components/PageNavLink';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';

export const App = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((persons) => {
        setIsLoading(true);
        setPeopleFromServer(persons);
        if (!peopleFromServer.length) {
          setErrorMessage('There are no people on the server');
        }
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage('Something went wrong');
      })
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
            <PageNavLink to="/home" text="Home" />
            <PageNavLink to="/people" text="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/people">
            <Route
              index
              element={(
                <People
                  isError={isError}
                  setIsError={setIsError}
                  isLoading={isLoading}
                  peopleFromServer={peopleFromServer}
                  errorMessage={errorMessage}
                />
              )}
            />
            <Route
              path=":slug"
              element={(
                <People
                  isError={isError}
                  setIsError={setIsError}
                  isLoading={isLoading}
                  peopleFromServer={peopleFromServer}
                  errorMessage={errorMessage}
                />
              )}
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
};
