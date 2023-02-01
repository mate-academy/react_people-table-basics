import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from './components/Navbar';

import './App.scss';

export const App: React.FC = React.memo(
  () => (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  ),
);
