import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { getPeople } from './api';
import { Person } from './types/Person';
import { MainNav } from './components/MainNav/MainNav';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [arePeoplePresent, setArePeoplePresent] = useState(true);

  const fetchData = async () => {
    try {
      const getPeopleFromServer = await getPeople();

      if (getPeopleFromServer.length === 0) {
        setArePeoplePresent(false);
      }

      setPeople(getPeopleFromServer);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div data-cy="app">
      <MainNav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route
                path=":peopleSlug"
                element={(
                  <PeoplePage
                    people={people}
                    isLoading={isLoading}
                    isError={isError}
                    arePeoplePresent={arePeoplePresent}
                  />
                )}
              />
              <Route
                index
                element={(
                  <PeoplePage
                    people={people}
                    isLoading={isLoading}
                    isError={isError}
                    arePeoplePresent={arePeoplePresent}
                  />
                )}
              />
            </Route>

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
