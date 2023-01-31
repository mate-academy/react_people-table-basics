import React, { memo } from 'react';

import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App: React.FC = memo(() => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="constainer">
        <Outlet />
      </div>
    </main>
  </div>
));
