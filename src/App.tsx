import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';
import { NotFoundPage } from './Components/NotFoundPage';
import { Nav } from './Components/Navigation';

import './App.scss';
import 'bulma';

const App: React.FC = () => (
  <div className="app">
    <header className="app__header">
      <Nav />
    </header>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
