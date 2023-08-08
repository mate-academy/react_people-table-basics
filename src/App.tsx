import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';

export const App: React.FC = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </main>
  </div>
);
