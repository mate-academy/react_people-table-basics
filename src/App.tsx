import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './pages/PeoplePage';
import { NavBar } from './components/Loader/NavBar';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="people">
              <Route
                path=":slug"
                element={<PeoplePage />}
              />
              <Route
                index
                element={<PeoplePage />}
              />
            </Route>

            <Route
              path="/"
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
          </Routes>
        </div>
      </main>
    </div>
  );
};
