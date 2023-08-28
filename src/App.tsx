import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Loader } from './components/Loader';
import { LoadingError } from './LoadingError';
import { MainNav } from './MainNav';
import { PageNotFound } from './PageNotFound';
import { PeoplePage } from './PeoplePage';
import { Person } from './types';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        const responseData = await response.json();

        setPeople(responseData);
      } catch (error) {
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div data-cy="app">
      <MainNav />

      <main className="section">
        <div className="container">

          <Routes>

            <Route
              path="people"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <PeoplePage people={people} />
                </>
              )}
            >
              <Route
                path=":personSlug"
                element={(<h1 className="title">Andrey</h1>)}
              />
            </Route>

            <Route path="/" element={<h1 className="title">Home page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          {isLoading && <Loader />}
          {(!people.length || showError) && <LoadingError />}
        </div>
      </main>
    </div>
  );
};
