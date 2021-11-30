import React from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';

import './mystyles.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <>
    <Header />

    <Routes>

      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="/" exact element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />

      <Route
        path="*"
        element={<h1 className="title">Page not found</h1>}
      />

    </Routes>
  </>
);

export default App;
