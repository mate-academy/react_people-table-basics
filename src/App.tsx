import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

const App: React.FC = () => {
  const [hash, setHash] = useState('');

  const activePage = () => {
    setHash(document.location.hash);
  };

  return (
    <div className="App">
      <Header hash={hash} />
      <div className="App__content">
        <Routes>
          <Route path="/" element={<HomePage active={activePage} />} />
          <Route path="people" element={<PeoplePage active={activePage} />} />

          <Route path="/home" element={<Navigate to="/" />} />

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
