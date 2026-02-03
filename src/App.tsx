import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.scss';

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div data-cy="app">
            <Navbar />
            <main className="section">
              <div className="container">
                <Outlet />
              </div>
            </main>
          </div>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
