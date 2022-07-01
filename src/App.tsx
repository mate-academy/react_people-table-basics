import React from 'react';
import {
  Link, Routes, Route, Navigate,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';
import { NotFoundPage } from './Components/NotFoundPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/people">People</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/people" element={<PeoplePage />} />
        {/* eslint-disable-next-line react/jsx-boolean-value */}
        <Route path="/home" element={<Navigate to="/" replace={true} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </div>
  );
};

export default App;
