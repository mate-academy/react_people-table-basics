import React from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/Loader/HomePage';
import { PeoplePage } from './components/Loader/PeoplePage';
import { NotFoundPage } from './components/Loader/NotFoundPage';
import { Navbar } from './components/Loader/Navbar';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="people/:slug?" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
