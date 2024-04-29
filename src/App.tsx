import './App.scss';
import React from 'react';
import { Nav } from './components/Nav/Nav';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div data-cy="app">
    <Nav />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
