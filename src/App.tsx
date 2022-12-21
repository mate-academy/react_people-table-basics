import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { ErrorPage } from './components/ErrorPage';
import { NavBar } from './components/NavBar';

export const App: React.FC = () => {
  return (
    <div data-cy="app">

      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
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

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
