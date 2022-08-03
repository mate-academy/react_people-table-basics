import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import 'bulma';
import { Header } from './components/Header';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

const App: React.FC = () => (
  <div className="App">
    <div className="container">

      <Header />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="people"
          element={<PeoplePage />}
        />
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
);

export default App;
