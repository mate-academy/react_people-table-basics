import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';

export const Router = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people">
        <Route index element={<PeoplePage />} />
        <Route path=":personSlug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Route>
  </Routes>
);
