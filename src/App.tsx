import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { PeopleTable } from './components/PeopleTable';
import { Navigation } from './components/Navigation';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(dataFromServer => {
        setPeople(dataFromServer);
      })
      .catch(() => (setError('Something went wrong')))
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
            <Navigation to="/" text="Home" />
            <Navigation to="/people" text="People" />
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
              path="/home"
              element={<Navigate to="/" replace />}
            />
            <Route path="/people">
              <Route
                index
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeopleTable
                      people={people}
                      isLoading={isLoading}
                      error={error}

                    />
                  </>
                )}
              />
              <Route
                path=":slug"
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeopleTable
                      people={people}
                      isLoading={isLoading}
                      error={error}
                    />
                  </>
                )}
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
