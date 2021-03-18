import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './App.scss';
import 'bulma';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <div className="content is-medium">
    <div className="App">
      <Header />

      <Switch>
        <Route
          path="/"
          exact
          component={HomePage}
        />

        <Route
          path="/people"
          component={PeoplePage}
        />

        <Redirect path="/home" to="/" />

        <NotFoundPage />
      </Switch>
    </div>
  </div>
);

export default App;
