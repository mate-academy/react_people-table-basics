import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from './components/pages/HomePage';
import { Navigation } from './components/Navigation';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { PeoplePage } from './components/pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people/:selectedSlug?" element={<PeoplePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
