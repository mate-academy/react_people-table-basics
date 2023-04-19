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
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    getPeople()
      .then((persons) => {
        setPeopleFromServer(persons);
        if (peopleFromServer?.length === 0) {
          setErrorMessage('There are no people on the server');
        }
      })
      .catch(() => setErrorMessage('Something went wrong'));
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
                  peopleFromServer={peopleFromServer}
                  errorMessage={errorMessage}
                />
              )}
            />
            <Route
              path=":slug"
              element={(
                <People
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
