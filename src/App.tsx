import './App.scss';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/Pages/PeoplePage';
import { HomePage } from './components/Pages/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

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
                path=":slug"
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
