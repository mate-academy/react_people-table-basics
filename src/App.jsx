import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const App = () => (
  <div className="App">
    <Header className="header"/>

    <Switch>

      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/people" exact>
        <PeoplePage />
      </Route>

      <NotFoundPage />

    </Switch>
  </div>
);

export default App;
