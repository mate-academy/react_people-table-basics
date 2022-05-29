import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Header } from './components/Header';

const App: React.FC = () => (
  <div className="app">
    <h1>People table</h1>
    <Header />
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
