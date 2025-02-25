import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="/people" element={<PeoplePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
