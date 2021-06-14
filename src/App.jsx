import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <Header />

    <main className="container">
      <Switch>
        <Route path="/people" component={PeoplePage} />

        <Redirect from="/home" to="/" />

        <Route exact path="/" component={HomePage} />

        <NotFoundPage />
      </Switch>
    </main>
  </div>
);

export default App;
