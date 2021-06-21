import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Header } from './components/Header';


import './App.scss';

const App = () => (
  <div className="App">
    <Header />

    <Switch>
      <Route path="/people">
        <PeoplePage />
      </Route>

      <Route path="/" exact>
        <HomePage />
      </Route>

      <Redirect path="/home" to="/" />

      <NotFoundPage />
    </Switch>
    
  </div>
);

export default App;
