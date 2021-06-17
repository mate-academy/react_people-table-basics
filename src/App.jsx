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
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/people" exact>
        <PeoplePage />
      </Route>

      <Redirect path="/home" to="/" />

      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
