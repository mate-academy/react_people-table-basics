import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import { NavPage } from './components/Loader/NavPanel';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <NavPage />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
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
