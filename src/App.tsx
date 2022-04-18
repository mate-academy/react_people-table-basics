import React from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  </div>
);

export default App;
