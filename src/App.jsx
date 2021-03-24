import React from 'react';
import 'bulma';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';
import { PeoplePage } from './PeoplePage';

const App = () => (
  <div className="App">
    {/* <h1>People table</h1> */}
    <Header />
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/page">
        <PeoplePage />
      </Route>
      <Redirect exact path="/" to="home" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
