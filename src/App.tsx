import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/Home.page';
import PeoplePage from './pages/People.page';
import ErrorPage from './pages/Error.page';

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />

      <Route path="people">
        <Route path=":personSlug?" element={<PeoplePage />} />
      </Route>

      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);
