import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/people">
        <PeoplePage />
      </Route>
      <Redirect path="/home" to="/" />
      <NotFoundPage />
    </Switch>
  </>
);

export default App;
