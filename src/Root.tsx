import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout/MainLayout';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/PagenotFound';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const Root: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
        <Route path="people">
          <Route path=":personSlug?" element={<PeoplePage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
