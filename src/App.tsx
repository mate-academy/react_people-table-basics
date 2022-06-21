import React from 'react';
import {
  NavLink, Routes, Route,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/PageNotFound/PageNotFound';

export const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <NavLink
          to="/"
        >
          Home
        </NavLink>
        {' '}
        <NavLink
          to="/people"
        >
          People page
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
