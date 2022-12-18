import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { NavBar } from './components/NavBar';

export const App: React.FC = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>
  </div>
);
