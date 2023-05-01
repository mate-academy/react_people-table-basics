import './App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainNav } from './components/MainNav';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage />
            }
          />

          <Route path="people">
            <Route
              index
              element={(
                <PeoplePage />
              )}
            />
            <Route
              path=":personSlug"
              element={(
                <PeoplePage />
              )}
            />
          </Route>

          <Route
            path="*"
            element={
              <NotFoundPage />
            }
          />
        </Routes>
      </div>
    </main>
  </div>
);
