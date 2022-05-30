import React from 'react';
import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MainNav } from './components/MainNav/MainNav';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App: React.FC = () => (
  <div className="app">
    <MainNav />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/people" element={<PeoplePage />} />
    </Routes>
  </div>
);

export default App;
