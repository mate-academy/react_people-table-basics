import React from 'react';
import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { App } from './App';
import { PageNotFound } from './pages/PageNotFound';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":personSlug?" />
          </Route>
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
