import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './Pages/PeoplePage';
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { NavigationBar } from './components/NavigationBar/NavigationBar';

export const App = () => (
  <div data-cy="app">
    <NavigationBar />

    <main className="section">
      <div className="container">

        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="people"
          >
            <Route
              index
              element={<PeoplePage />}
            />
            <Route
              path="/people/:slug"
              element={<PeoplePage />}
            />
          </Route>
          <Route
            path="/home"
            element={<Navigate to="/" replace />}
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
