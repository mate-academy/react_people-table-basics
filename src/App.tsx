import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Header } from './components/Header';

export const App: React.FC = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="home"
              element={<Navigate replace to="/" />}
            />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
