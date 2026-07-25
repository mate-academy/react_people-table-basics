import './App.scss';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => (
  <HashRouter>
    <div data-cy="app">
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />

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
    </div>
  </HashRouter>
);
