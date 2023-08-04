import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFound } from './pages/NotFound';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="people" element={<PeoplePage />}>
          <Route index element={<PeoplePage />} />
          <Route path=":personId" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
