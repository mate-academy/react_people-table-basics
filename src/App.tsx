import './App.scss';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { Navigation } from './components/Navigation/Navigation';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
