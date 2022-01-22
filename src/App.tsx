// import React from 'react';
import {
  NavLink,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <nav className="navigation">
        <NavLink
          to="/"
          className="link"
          style={({ isActive }) => {
            return {
              display: 'block',
              color: isActive ? 'blue' : '',
            };
          }}
        >
          Home Page
        </NavLink>
        <NavLink
          to="/PeoplePage"
          className="link"
          style={({ isActive }) => {
            return {
              display: 'block',
              color: isActive ? 'blue' : '',
            };
          }}
        >
          People Page
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/PeoplePage" element={<PeoplePage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
