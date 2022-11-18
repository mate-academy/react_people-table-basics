import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { Navigation } from './components/Navigation';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="*"
            element={<NotFoundPage />}
          />
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />
          <Route path="people">
            <Route
              index
              element={
                <PeoplePage />
              }
            />

            <Route
              path=":personName"
              element={
                <PeoplePage />
              }
            />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
