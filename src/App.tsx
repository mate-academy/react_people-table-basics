import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/navigation/Navbar';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="*" element={(<NotFoundPage />)} />
            <Route path="/home" element={(<Navigate to="/" replace />)} />
            <Route path="/" element={(<HomePage />)} />
            <Route path="people">
              <Route index element={(<PeoplePage />)} />
              <Route path=":personSlug" element={(<PeoplePage />)} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
