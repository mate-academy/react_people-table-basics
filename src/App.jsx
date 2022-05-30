import './App.scss';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/NotFoundPage/NotFoundPage';

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
