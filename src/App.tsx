import './App.scss';
import React from 'react';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/Pages/PeoplePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/Pages/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route index element={<HomePage />} />
            <Route
              path="/home"
              element={<Navigate to={'/'} replace={true} />}
            />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
