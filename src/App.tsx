import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './components/PeoplePage';

export const App: React.FC = () => {
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
              element={
                <PeoplePage />
              }
            />
            <Route
              path="/home"
              element={(
                <Navigate
                  to="/"
                  replace
                />
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
