import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            index
            element={(
              <h1 className="title">Home Page</h1>
            )}
          />

          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>

          <Route
            path="*"
            element={(
              <h1 className="title">Page not found</h1>
            )}
          />
        </Routes>
      </div>
    </main>
  </div>
);
