import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navigation } from './components/Navigation/Navigation';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { HomePage } from './components/HomePage/HomePage';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
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
    </main>
  </div>
);
