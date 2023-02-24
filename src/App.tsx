import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { Navigation } from './components/Navigation';
import { NotFoundPage } from './Pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />
      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route path="people">
              <Route
                index
                element={<PeoplePage />}
              />

              <Route
                path=":slug"
                element={<PeoplePage />}
              />
            </Route>

            <Route
              path="*"
              element={<NotFoundPage />}
            />

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
