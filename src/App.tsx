import React from 'react';

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import './App.scss';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route path="/people">
              <Route
                index
                element={(
                  <>
                    <PeoplePage />
                  </>
                )}
              />
              <Route
                path=":selectedPersonSlug"
                element={(
                  <PeoplePage />
                )}
              />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
