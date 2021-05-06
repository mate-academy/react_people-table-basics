import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';

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
