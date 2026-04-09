import React from 'react';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { TodosProvider } from './Context/Context';
import { PeoplePage } from './pages/PeoplePage.tsx/PeoplePage';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const Root = () => (
  <TodosProvider>
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to={'/'} replace />} />
          <Route path="people/:slug?" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </TodosProvider>
);
