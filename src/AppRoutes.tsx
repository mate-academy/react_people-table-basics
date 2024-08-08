import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/PageNotFound';


export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<Navigate to={'/'} replace />} />
    <Route path="people">
      <Route index element={<PeoplePage />} />
      <Route path=":slug" element={<PeoplePage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
