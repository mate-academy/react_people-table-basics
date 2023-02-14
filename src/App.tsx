import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from './components/Loader';

import './App.scss';
import { Navigation } from './components/Navigation';
import { getPeople } from './api';
import { Person } from './types';
import { PeopleTable } from './components/Peopletable';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((data) => (
        setPeople(data)
      ));
  }, []);

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="title">Home Page</h1>
              }
            />

            <Route
              path="/people"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <div className="block">
                    <div className="box table-container">
                      <Loader />

                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>

                      <p
                        data-cy="noPeopleMessage"
                      >
                        There are no people on the server
                      </p>

                      <PeopleTable
                        people={people}
                      />
                    </div>
                  </div>
                </>
              )}
            />
            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
