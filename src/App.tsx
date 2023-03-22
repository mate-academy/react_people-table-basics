import './App.scss';
import React from 'react';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { PeoplePage } from './components/PeoplePage';
import { NavigationBar } from './components/NavigationBar';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <NavigationBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":personId" element={<PeoplePage />} />
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
