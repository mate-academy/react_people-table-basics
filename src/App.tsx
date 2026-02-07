import './App.scss';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from './pages/Navbar';
import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
