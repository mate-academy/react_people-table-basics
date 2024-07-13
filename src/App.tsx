import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import React from 'react';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
