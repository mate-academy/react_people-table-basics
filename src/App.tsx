import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="title">Home Page</h1>
            }
          />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route
            path="/people"
            element={<PeoplePage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
