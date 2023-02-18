import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { Homepage } from './components/Homepage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Homepage />}
          />

          <Route
            path="/people"
            element={<PeoplePage />}
          />

          <Route
            path="/people/:personSlug"
            element={<PeoplePage />}
          />

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
          <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </main>
  </div>
);
