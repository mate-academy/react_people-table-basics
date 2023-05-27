import './App.scss';

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/people"
              element={<PeoplePage />}
            />

            <Route
              path="/people/:personSlug"
              element={<PeoplePage />}
            />

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
