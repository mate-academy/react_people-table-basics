import './App.scss';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />

          <Route path="/people">
            <Route
              index
              element={<PeoplePage />}
            />

            <Route
              path=":slug"
              element={<PeoplePage />}
            />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
