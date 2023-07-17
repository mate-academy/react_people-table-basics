import './App.scss';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="people/:slug" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);
