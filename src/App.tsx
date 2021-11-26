// import React from 'react';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import 'bulma';

import './App.scss';
import { FC } from 'react';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Header } from './components/Header';
import { PeoplePage } from './components/PeoplePage';

const App: FC = () => (
  <div className="App">
    <Header />

    <section className="section">
      <div className="container">
        <h1 className="title">
          Mate Academy
        </h1>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/people">
            <PeoplePage />
          </Route>

          <Redirect to="/" path="/home" />

          <NotFoundPage />
        </Switch>

      </div>
    </section>
  </div>
);

export default App;
