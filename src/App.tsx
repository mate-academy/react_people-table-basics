import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components/Header';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">

      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="/home" replace />
          }
        />

        <Route
          path="/home"
          element={
            <h1 className="App__home-page">Home page</h1>
          }
        />

        <Route
          path="/people"
          element={
            <PeoplePage />
          }
        />

        <Route
          path="*"
          element={
            <NotFoundPage />
          }
        />
      </Routes>

    </div>
  );
};

export default App;
