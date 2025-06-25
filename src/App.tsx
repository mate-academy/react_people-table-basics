import './App.scss';
import { Navigation } from './components/Navigation';
import { Routes, Route, Navigate } from 'react-router-dom';

import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';

export const App = () => {
  return (
    <>
      <Navigation />
      <div data-cy="app">
        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/home" element={<Navigate to="/" replace />} />

              <Route path="/" element={<HomePage />} />

              <Route path="/people/:slug?" element={<PeoplePage />}>
                <Route
                  index
                  element={<h1 className="title">People Page</h1>}
                />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
