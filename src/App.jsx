import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
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
  </div>
);

export default App;
