import { Route, Routes, HashRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { FC } from 'react';

export const Root: FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
