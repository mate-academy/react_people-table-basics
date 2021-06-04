import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <h1>People table</h1>

    <Header />

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeoplePage} />

      <Redirect from="/home" to="/" />
      <Redirect from="/react_people-table-basics/" to="/" />

      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
