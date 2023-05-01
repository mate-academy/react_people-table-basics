import './App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainNav } from './MainNav';
import { PeopleTable } from './PeopleTable';

export const App: React.FC = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="title">Home Page</h1>
            }
          />

          <Route path="people">
            <Route
              index
              element={(
                <>
                  <h1 className="title">People Page</h1>

                  <PeopleTable />
                </>
              )}
            />
            <Route
              path=":personSlug"
              element={(
                <>
                  <h1 className="title">People Page</h1>

                  <PeopleTable />
                </>
              )}
            />
          </Route>

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
