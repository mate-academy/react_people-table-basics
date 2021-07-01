import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from './Components/Header';
import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';
import { NotFoundPage } from './Components/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <Header />

    <Switch>
      <Route path="/" component={HomePage} exact />

      <Route path="/people" component={PeoplePage} exact />

      <Redirect path="/home" to="/" />

      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
