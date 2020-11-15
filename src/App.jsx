import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { MainNavigation } from './components/MainNavigation';

import './App.scss';

const App = () => (
  <div className="App">
    <MainNavigation />
    <h1 className="App__title">Info-collapse</h1>

    <Switch>
      <Route
        path="/people"
      >
        <PeoplePage />
      </Route>

      <Route
        path="/"
        exact
      >
        <HomePage />
      </Route>

      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
