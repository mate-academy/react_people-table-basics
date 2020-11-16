import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.scss';
import { HomePage } from './components/HomePage';
import { MainNavigation } from './components/MainNavigation';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <div className="App">
    <MainNavigation />
    <h1>People table</h1>

    <Switch>

    <Route
      path="/"
      exact
      component={HomePage}
    />

    <Route
      path="/people"
      exact
      component={PeoplePage}
    />

    <Redirect path="/home" to="/" />

    <NotFoundPage />
    </Switch>

  </div>
);

export default App;
