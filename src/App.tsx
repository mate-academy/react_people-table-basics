import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />
            <Route path="/people">
              <Route
                index
                element={(
                  <PeoplePage />
                )}
              />

              <Route
                path=":personSlug"
                element={(
                  <PeoplePage />
                )}
              />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>

        </div>
      </main>
    </div>
  );
};
