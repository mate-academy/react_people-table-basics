import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

export const Root = () => (
  <Routes>
    <Route index path="/" element={<HomePage />} />
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="/people" element={<PeoplePage />} />
    <Route path="/people/:slug" element={<PeoplePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
