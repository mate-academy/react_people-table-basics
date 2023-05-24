import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import './App.scss';
import {
  useEffect, useState,
} from 'react';
import { Person } from './types';
import { getPeople } from './api';
import { PageNavLink } from './components/PageNavLink';
import { PersonTable } from './components/PersonTable';

export const App: React.FC = () => {
  const [peopleState, setPeopleState] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/people') {
      setLoading(true);
      getPeople()
        .then((result) => setPeopleState(result))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [location]);

  if (location.pathname === '/home') {
    return <Navigate to="/" replace />;
  }

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
            <PageNavLink to="/" navText="Home" />
            <PageNavLink to="/people" navText="People" />
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
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
            <Route path="/people">
              <Route
                index
                element={(
                  <PersonTable
                    peopleState={peopleState}
                    error={error}
                    loading={loading}
                  />
                )}
              />
              <Route
                path=":chosenPerson"
                element={(
                  <PersonTable
                    peopleState={peopleState}
                    error={error}
                    loading={loading}
                  />
                )}
              />
            </Route>
          </Routes>

        </div>
      </main>
    </div>
  );
};
