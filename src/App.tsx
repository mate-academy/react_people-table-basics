import './App.scss';
import React from 'react';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { PeoplePage } from './components/PeoplePage';
import { NavigationBar } from './components/NavigationBar';
import { Homepage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <NavigationBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Homepage />}
            />
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
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
