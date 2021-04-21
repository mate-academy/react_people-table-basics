import React from 'react';
import { Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import './App.scss';

export const App = () => (
  <div className="App">
    <Header />
    <Route path="/">
      <HomePage />
    </Route>

    <Route path="/people">
      <PeoplePage />
    </Route>
  </div>
);
