import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/people">
              <Route
                index
                element={<PeoplePage />}
              />
              <Route
                path=":userSlug"
                element={<PeoplePage />}
              />
            </Route>

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route path="/home" element={<Navigate to="/" replace />} />

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
