import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';

export const Layout: React.FC = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
