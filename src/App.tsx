import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Layout } from './components/Loader/Layout';
import { HomePage } from './components/Loader/HomePage';
import { PeoplePage } from './components/Loader/PeoplePage';
import { NotFoundPage } from './components/Loader/NotFoundPage';

export const App = () => (
  <Routes>
    <Route path="/home" element={<Navigate to={'/'} replace />}></Route>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />}></Route>
      <Route path="/people" element={<PeoplePage />}>
        <Route path=":personLink" element={<PeoplePage />}></Route>
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Route>
  </Routes>
);
