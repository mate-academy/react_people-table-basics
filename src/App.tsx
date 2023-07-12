import { FC } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';
import { Navigation } from './components/Navigation';

export const App: FC = () => {
  return (
    <div data-cy="app">
      <main className="section">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route
              path=":slug"
              element={<PeoplePage />}
            />
          </Route>
          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </main>
    </div>
  );
};
