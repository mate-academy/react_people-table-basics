import { Outlet } from 'react-router-dom';
import './App.scss';
import { NavigationBar } from './components/NavigationBar';
import React from 'react';

export const App = () => (
  <div data-cy="app">
    <NavigationBar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);
