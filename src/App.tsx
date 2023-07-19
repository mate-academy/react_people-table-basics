import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { LoadingError } from './LoadingError';
import { MainNav } from './MainNav';
import { PageNotFound } from './PageNotFound';
import { PeoplePage } from './PeoplePage';
import { Person } from './types';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersArr, setUsersArr] = useState<Person[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        const responseData = await response.json();

        setUsersArr(responseData);
      } catch (error) {
        console.log('error');
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
                  <PeoplePage usersArr={usersArr} />
                </>
              )}
            />

            <Route path="/" element={<h1 className="title">Home page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <LoadingError isLoading={isLoading} usersArr={usersArr} />
        </div>
      </main>
    </div>
  );
};
