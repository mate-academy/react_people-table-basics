import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';

import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <header>
      <Navigation />
    </header>

    <main className="container">
      <Switch>
        <Route path="/people">
          <PeoplePage />
        </Route>

        <Redirect from="/home" to="/" />

        <Route exact path="/">
          <HomePage />
        </Route>

        <NotFoundPage />
      </Switch>
    </main>
  </div>
);

export default App;
