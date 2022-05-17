import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';
import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <h1>People table</h1>
    <Header />

    <Routes>
      <Route
        path="/react_people-table-basics"
        element={<HomePage />}
      />
      <Route
        path="/react_people-table-basics/people"
        element={<PeoplePage />}
      />
      <Route
        path="/react_people-table-basics/home"
        element={<Navigate to="/react_people-table-basics" />}
      />
      <Route
        path="/react_people-table-basics/*"
        element={<NotFoundPage />}
      />
    </Routes>
  </div>
);

export default App;
