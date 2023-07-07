import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './pages/PeoplePage';
import { MainNavLinks } from './components/MainNavLinks';

export const App: React.FC = () => (
  <div data-cy="app">
    <MainNavLinks />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="people">
            <Route
              index
              element={<PeoplePage />}
            />
            <Route
              path=":slug"
              element={<PeoplePage />}
            />
          </Route>
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />
          <Route path="home" element={<Navigate to="/" />} />
          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </div>
    </main>
  </div>
);
