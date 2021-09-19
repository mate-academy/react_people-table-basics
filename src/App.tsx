import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { Header } from './components/Header/Header';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App = () => (
  <div className="App">
    <Header />
    <div className="container">
      <h1 className="title">
        People table
      </h1>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/people">
          <PeoplePage />
        </Route>

        <Redirect
          to="/"
          path="/home"
        />

        <NotFoundPage />
      </Switch>
    </div>
  </div>
);

export default App;
