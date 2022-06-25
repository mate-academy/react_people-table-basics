import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import 'bulma';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { MainNavigation } from './components/MainNavigation';
import { NotFoundPage } from './components/NotFoundPage';

const App: React.FC = () => {
  return (
    <>
      <MainNavigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
