import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/people" component={PeoplePage} />
      <Route
        path="/"
        exact
        component={HomePage} 
      />
      <Redirect path="/home" to="/" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
