import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';
import React from 'react';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main>
      <div className="container">
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
      </div>
    </main>
  </div>
);
