import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

import { PeoplePage } from './components/Pages/PeoplePage';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </div>
);
