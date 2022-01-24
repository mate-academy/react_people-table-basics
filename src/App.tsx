import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="people" element={<PeoplePage />} />

          <Route
            path="*"
            element={
              <p>Page not found</p>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
