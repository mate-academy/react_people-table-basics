import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { useState } from 'react';

import './App.scss';
import { getPeople } from './api';
import { Person } from './types';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const personFromServer = async () => {
    setIsLoaded(true);

    try {
      const persons = await getPeople();

      setPeople(persons);
    } catch {
      setIsError(true);
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage
                    people={people}
                    isError={isError}
                    isLoaded={isLoaded}
                    loadDate={personFromServer}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage
                    people={people}
                    isError={isError}
                    isLoaded={isLoaded}
                    loadDate={personFromServer}
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
