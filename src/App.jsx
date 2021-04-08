import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './App.scss';
import { HomePage } from './components/HomePage';
import { Header } from './components/Header';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <h1>People table</h1>
    <Header />
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/people">
        <PeoplePage />
      </Route>
      <Redirect path="/home" to="/" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
