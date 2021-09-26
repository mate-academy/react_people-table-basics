import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import PeoplePage from './PeoplePage';
import NotFoundPage from './NotFoundPage';
import './App.scss';

const App = () => (
  <div
    className="App"
  >
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeoplePage} />

      <Redirect path="/home" to="/" />

      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
