import React from 'react';

import './App.scss';
import { Navigation } from './components/Navigation';
import { Routers } from './routers/Routers';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routers />
      </div>
    </main>
  </div>
);
