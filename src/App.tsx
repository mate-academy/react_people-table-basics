import React from 'react';
import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';

import './App.scss';

import PeoplePage from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

const App: React.FC = () => (
  <div className="App">
    <header>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/people">People</Link>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="people" element={<PeoplePage />} />

      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
