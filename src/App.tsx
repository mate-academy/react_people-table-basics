import React from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';
import { Navigation } from './Navigation';

const App: React.FC = () => (
  <div className="app">
    <Navigation />

    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/people">
        <PeoplePage />
        <Redirect path="/home" to="/" />
        <NotFoundPage />
      </Route>
    </Switch>

  </div>
);

export default App;
