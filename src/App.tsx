import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage';
import { NavBar } from './components/NavBar';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <div className="App__body">
      <div className="App__navbar-container">
        <NavBar />
      </div>

      <div className="App__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route
            path="/home"
            element={<Navigate to="/" />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </div>

    </div>
  </div>
);

export default App;
