import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage';
import { NoTFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <header>
      <div>
        <nav>
          <Link to="/">
            <button
              type="button"
              className="waves-effect waves-light btn"
            >
              Home
            </button>
          </Link>
          <Link to="/table">
            <button
              type="button"
              className="waves-effect waves-light btn"
            >
              table
            </button>
          </Link>
        </nav>
      </div>
    </header>

    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="table" element={<PeoplePage />} />
      <Route path="*" element={<NoTFoundPage />} />
    </Routes>
  </div>
);

export default App;
