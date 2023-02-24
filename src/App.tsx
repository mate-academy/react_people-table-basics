import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import React from 'react';
import './App.scss';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { ErrorPage } from './components/ErrorPage';
import { Navigation } from './components/Navigation';

export const App: React.FC = () => (
  <div data-cy="app">

    <Navigation />
    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="/people"
            element={<PeoplePage />}
          />

          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
