import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => (
  <>
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Accept nested paths so /people/:slug works */}
          <Route path="/people/*" element={<PeoplePage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </>
);
