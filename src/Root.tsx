import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="/" element={<HomePage />} />
    <Route path="/people" element={<PeoplePage />} />
    <Route path="/people/:personSlug" element={<PeoplePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
