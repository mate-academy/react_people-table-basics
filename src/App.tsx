import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { PeopleTablePage } from './pages/PeopleTablePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeopleTablePage />} />
            <Route path=":slug" element={<PeopleTablePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
