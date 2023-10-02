import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { People } from './pages/People';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

import { NavBar } from './components/NavBar';

import './App.scss';

export const App: React.FC = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
