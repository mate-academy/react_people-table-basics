import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundePage/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { AppLayout } from './AppLayout';

export const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="people/:slug" element={<PeoplePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
