/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import { Header } from './Header';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';
import './App.scss';
import { setSourceMapRange } from 'typescript';

const App = () => (
  <>
    <Header />
    <div className="App">
      {/* <h1>People table</h1> */}
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/people">
          <PeoplePage />
        </Route>
        <Redirect path="/home" to="/" />
        <NotFoundPage />
      </Switch>

    </div>
  </>
);

export default App;
