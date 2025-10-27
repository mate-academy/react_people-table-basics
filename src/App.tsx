import './App.scss';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/people/:slug" element={<PeoplePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);
