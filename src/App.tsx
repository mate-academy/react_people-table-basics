import './App.scss';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { Nav } from './Nav';

export const App: React.FC = () => (
  <div data-cy="app">
    <Nav />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
