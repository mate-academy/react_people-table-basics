import { FC } from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { PeoplePage } from '../pages/PeoplePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PATH } from '../types';

export const MainRoutes: FC = () => {
  return (
    <Routes>
      <Route path={PATH.Main} element={<HomePage />} />
      <Route path={PATH.Home} element={<Navigate to={PATH.Main} replace />} />

      <Route path={PATH.People}>
        <Route index element={<PeoplePage />} />
        <Route path={PATH.USER_ID} element={<PeoplePage />} />
      </Route>

      <Route path={PATH.Error} element={<NotFoundPage />} />
    </Routes>
  );
};
