import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navigation/NavBar';
import React from 'react';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
