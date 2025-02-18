import './App.scss';

import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { ErrorPage } from './components/ErrorPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people">
        <Route index element={<PeoplePage />} />
        <Route path=":personSlug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);
