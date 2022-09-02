import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { NavBar } from './components/NavBar';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/people"
              element={(
                <PeoplePage />
              )}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
