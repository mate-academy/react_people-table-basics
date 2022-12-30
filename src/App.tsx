import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { Header } from './components/Header/Header';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Header />

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
                element={(<PeoplePage />)}
              />

              <Route
                path=":slug"
                element={(<PeoplePage />)}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
