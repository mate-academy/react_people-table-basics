import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
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
      <Redirect from="/home" to="/" exact />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
