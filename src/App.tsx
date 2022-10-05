import React from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';

import './App.scss';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <HomePage />
        <PeoplePage />
        <PageNotFound />
      </div>
    </main>
  </div>
);
