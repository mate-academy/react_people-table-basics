import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

import { App } from './App';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace={true} />} />
      <Route path="people">
        <Route path=":personSlug?" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
