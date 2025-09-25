import { HashRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.scss';
import React from 'react';

export const App = () => {
  return (
    <HashRouter>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'has-background-grey-lighter' : ''
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className={({ isActive }) =>
            isActive ? 'has-background-grey-lighter' : ''
          }
        >
          People
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
