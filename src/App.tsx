import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/NavigationLayout/NavigationLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </div>
);
