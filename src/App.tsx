import React from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import './App.scss';
import { NavBar } from './components/NavBar/NavBar';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFountPage/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};
