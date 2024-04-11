import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorPage, HomePage, Layout, PeoplePage } from './components';

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="people/:personSlug?" element={<PeoplePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);
