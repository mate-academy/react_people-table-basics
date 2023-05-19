import { Navigate, Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import './App.scss';

import { Loader } from './components/Loader';
import { NavBar } from './components/NavBar';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { getPeople } from './api';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const recivePeople = useCallback(
    async () => {
      setIsLoading(true);
      const data = await getPeople();

      setPeople(data);
      setIsLoading(false);
    }, [],
  );

  useEffect(() => {
    recivePeople();
  }, []);

  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            {!isLoading && (
              <Route path="/people">
                <Route
                  index
                  element={<PeoplePage people={people} />}
                />
                <Route
                  path="/people/:personSlug"
                  element={<PeoplePage people={people} />}
                />
              </Route>
            )}

            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <div className="block">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!people && (
                <>
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>

                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
