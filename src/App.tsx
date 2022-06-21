import React from 'react';

import { Route, Routes, Navigate } from 'react-router';

import './App.scss';

import { HomePage } from './components/HomePage';

import { Header } from './components/Header';

import { PeoplePage } from './components/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/people" element={<PeoplePage />} />

      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="*" element={<h1>404</h1>} />

    </Routes>
  </div>
);

export default App;
