import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App__container box">
        <h1 className="App__title">
          People table
        </h1>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="people-page" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};
