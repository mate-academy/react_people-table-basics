import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './page/HomePage';
import { NotFound } from './page/NotFound';
import { PeoplePage } from './page/PeoplePage';

export const App = () => (
  <Routes>
    <Route element={<HomePage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people/:slug?" element={<PeoplePage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
