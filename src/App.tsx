import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Components/HomePage';
import { Navigation } from './Components/Navigation';
import { NotFoundPage } from './Components/NotFoundPage';
import { PeoplePage } from './Components/PeoplePage';
import 'bulma/css/bulma.css';

const App: React.FC = () => (
  <div className="App">
    <h1 className="title is-1 has-text-centered">People table</h1>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
