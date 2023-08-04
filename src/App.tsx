import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Nav } from './components/Nav/Nav';
import { BlockPeople, ErrorTypes } from './components/BlockPeople/BlockPeople';
import { Person } from './types';
import { getPeople } from './api';

import './App.scss';

export const App = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorTypes | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getPeople().then(fatchData => {
      setData(fatchData);

      return fatchData;
    }).catch(() => {
      if (!data) {
        setError(ErrorTypes.Api);
      }

      if (data.length === 0) {
        setError(ErrorTypes.NotData);
      }
    }).finally(() => setIsLoading(false));
  }, []);

  return (
    <div data-cy="app">
      <Nav />

      <main className="section">
        <div className="container">

          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route
              path="/people"
              element={(
                <BlockPeople
                  persons={data}
                  loading={isLoading}
                  error={error}
                />
              )}
            />

          </Routes>

        </div>
      </main>
    </div>
  );
};
