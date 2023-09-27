import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<HomePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
