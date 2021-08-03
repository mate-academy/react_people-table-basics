import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { Homepage } from './components/Homepage';
import { Header } from './components/Header';

import './App.scss';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/" exact>
        <Homepage />
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
