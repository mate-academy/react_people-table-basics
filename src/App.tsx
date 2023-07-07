import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Person } from './types/Person';
import { getPeople } from './api';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <div data-cy="app">
      <Navigation />
      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />

            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage
                    people={people}
                    isLoading={isLoading}
                    isError={isError}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage
                    people={people}
                    isLoading={isLoading}
                    isError={isError}
                  />
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
