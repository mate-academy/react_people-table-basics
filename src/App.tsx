/* eslint-disable import/no-extraneous-dependencies */
import './App.scss';
import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>People table</h1>
      <Header />
      <Routes>
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
