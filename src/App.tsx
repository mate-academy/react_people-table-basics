import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/People';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="*"
            element={<PageNotFound />}
          />
          <Route
            path="/people"
            element={<PeoplePage />}
          />
          <Route path="/people/:slug" element={<PeoplePage />} />
        </Routes>

      </main>
    </div>
  );
};
