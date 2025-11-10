import React from 'react';
import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/Peoples/PeoplesPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to={'/'} replace />} />

        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
