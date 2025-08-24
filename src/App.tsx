import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/Layout';

export const App = () => (
  <Layout>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/" element={<HomePage />} />

      <Route path="/people" element={<PeoplePage />} />
      <Route path="/people/:slug" element={<PeoplePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Layout>
);
