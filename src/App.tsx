import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Header } from './components/Header/Header';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

import './App.scss';

export const App = () => (
  <div className="App">
    <section>
      <Header />
    </section>
    <section>
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
    </section>
  </div>
);
