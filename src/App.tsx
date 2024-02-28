
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Loader } from './components/Loader';

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
