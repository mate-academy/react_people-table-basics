import { FunctionComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage';
import { PeoplePage } from '../Pages/PeoplePage';
import { NotFoundPage } from '../Pages/NotFoundPage';

export const AppRouter: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="people">
      <Route index element={<PeoplePage />} />
      <Route path=":slug" element={<PeoplePage />} />
    </Route>
    <Route path="home" element={<Navigate to="/" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
