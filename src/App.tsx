import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import './App.scss';

const App:React.FC = () => (
  <>
    <Header />

    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/" element={<HomePage />} />

      <Route path="/people" element={<PeoplePage />} />

      <Route path="/notfound" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default App;
