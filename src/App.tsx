import './App.scss';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { HomePage } from './Pages/HomePage';
import { NavigationBar } from './components/NavigationBar';

export const App: React.FC = () => (
  <div data-cy="app">
    <NavigationBar />

    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </div>
);
