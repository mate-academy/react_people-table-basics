import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { PeoplePage } from '../../pages/PeoplePage';
import { PageNotFound } from '../../pages/PageNotFound';

export const AppRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people">
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>
    </Route>

    <Route
      path="*"
      element={<PageNotFound />}
    />
  </Routes>
);
