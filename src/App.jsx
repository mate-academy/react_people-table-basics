import React from 'react';

import './App.scss';
import 'bulma';

import { Route, Switch, Redirect } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { People } from './components/People';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <Navigation />
    <Switch>
      <Route path="/people" component={People} />
      <Route path="/" exact component={HomePage} />
      <Redirect path="/home" to="/" />
      <NotFoundPage />

    </Switch>
  </div>
);

export default App;
