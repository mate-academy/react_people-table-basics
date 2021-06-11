import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <Header />

    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/people" exact>
        <PeoplePage />
      </Route>

      <Redirect path="/home" to="/" />

      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
