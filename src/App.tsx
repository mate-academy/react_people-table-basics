import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';
import { Navigation } from './Components/Navigation';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
};
