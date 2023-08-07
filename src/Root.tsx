import React from 'react';
import {
  HashRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="people/:slug" element={<PeoplePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </Router>
);
