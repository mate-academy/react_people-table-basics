import './App.scss';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
