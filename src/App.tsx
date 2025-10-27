import './App.scss';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import React from 'react';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people/:slug?" element={<PeoplePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
