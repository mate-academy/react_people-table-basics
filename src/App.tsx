import React from 'react';
import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';

import './App.scss';

import PeoplePage from './components/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <header>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/people" className="nav-link">People</Link>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="/people" element={<PeoplePage />} />

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route {
        ...<p>Page Not Found</p>
      }
      />
    </Routes>
  </div>
);

export default App;
