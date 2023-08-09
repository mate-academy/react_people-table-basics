import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/pages/HomePage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <Routes>
      <Route path="/">
        <Route path="*" element={<NotFoundPage />} />
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </div>
);
