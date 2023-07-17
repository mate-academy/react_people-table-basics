import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { PeopleTabPage } from './pages/PeopleTabPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/Layout';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people">
        <Route index element={<PeopleTabPage />} />
        <Route path=":selectedPersonSlug" element={<PeopleTabPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
