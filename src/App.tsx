import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/pages/PeoplePage/HomePage';
import { NotFoundPage } from './components/pages/PeoplePage/NotFoundPage';
import { PeoplePage } from './components/pages/PeoplePage/PeoplePage';
import { Layout } from './components/Layout/Layout';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
