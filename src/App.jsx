import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MainNavigation } from './Components/MainNavigation/MainNavigation';
import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';
import { NotFoundPage } from './Components/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <MainNavigation />
    <Switch>
      <Route path="/people">
        <PeoplePage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Redirect path="/home" to="/" />
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  </div>
);

export default App;
