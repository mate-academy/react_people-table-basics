import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { PeopleTable } from './components/PeopleTable';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={(
            <h1 className="title is-3 ml-5">
              Home page
            </h1>
          )}
        />

        <Route
          path="people"
          element={(
            <>
              <h1 className="title is-3 ml-5">
                People page
              </h1>

              <PeopleTable />
            </>
          )}
        />

        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element="Page not found" />
      </Routes>
    </div>
  );
};
