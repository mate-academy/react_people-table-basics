import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import People from './components/People';
import NotFoundPage from './components/NotFoundPage';
import './App.scss';

const App: React.FC = () => (

  <>
    <Header />
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/people"
        element={<People />}
      />

      <Route
        path="/notfound"
        element={<NotFoundPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>
  </>

);

export default App;
