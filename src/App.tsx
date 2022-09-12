import { useEffect, useState } from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { getPeople } from './api';
import { Loader } from './components/Loader';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './components/PeoplePage';
import { Person } from './types';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <div data-cy="app">

      <Navigation />

      <main className="section">
        <div className="container">

          <div className="block">
            <div className="box table-container">
              {loading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              <Routes>
                <Route
                  path="people"

                >
                  <Route
                    index
                    element={<PeoplePage people={people} />}
                  />
                  <Route
                    path=":slug"
                    element={<PeoplePage people={people} />}
                  />
                </Route>

                <Route
                  path="/"
                  element={<h1 className="title">Home Page</h1>}
                />
                <Route
                  path="home"
                  element={<Navigate to="/" replace />}
                />

                <Route
                  path="*"
                  element={<h1 className="title">Page not found</h1>}
                />
              </Routes>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
