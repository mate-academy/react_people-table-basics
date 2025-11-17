import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => (
  <HashRouter>
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  </HashRouter>
);
