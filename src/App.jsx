import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import './App.scss';
import { Header } from './components/Header';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/home" component={HomePage} />
      <Route path="/people" component={PeoplePage} />
      <Redirect from="/" to="home" />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
