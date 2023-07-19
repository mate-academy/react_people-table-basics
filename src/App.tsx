import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Person } from './types/Person';
import { getPeople } from './api';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.scss';
import { Layout } from './components/Layout';

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

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />
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
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
};
