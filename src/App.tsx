import * as React from 'react';
import { Navigation } from './components/Navigation';

import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <main className="section">
        <Navigation />

        <div className="section">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
