import React from 'react';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';

import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App: React.FC = () => (
  <HashRouter>
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route path="/people" element={<PeoplePage />} />

          <Route
            path="/people/:slug"
            element={<PeoplePage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </HashRouter>
);
