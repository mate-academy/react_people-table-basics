import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AppPage } from './pages/AppPage';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<AppPage />}>
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
