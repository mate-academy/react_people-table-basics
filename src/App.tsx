import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';

import { useCallback, useEffect, useState } from 'react';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Navbar } from './components/Navbar/Navbar';
import { Person } from './types';
import { getPeople } from './api';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LoadPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    LoadPeople();
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/people">
              <Route
                index
                element={(
                  <PeoplePage
                    people={people}
                    isError={isError}
                    isLoading={isLoading}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage
                    people={people}
                    isError={isError}
                    isLoading={isLoading}
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
