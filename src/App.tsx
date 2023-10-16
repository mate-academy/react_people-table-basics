import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navigation } from './components/Navigation/Navigation';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":personSlug?" />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
