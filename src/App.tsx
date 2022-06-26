import React from 'react';
import './App.scss';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Header } from './components/Header/Header';
import 'bulma/css/bulma.min.css';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<h2> Page not found</h2>} />
    </Routes>
  </div>
);

export default App;
