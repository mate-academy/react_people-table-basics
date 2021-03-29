import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import { Header } from './Header/Header';
import { HomePage } from './HomePage/HomePage';
import { PeoplePage } from './PeoplePage/PeoplePage';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';

export const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/people">
        <PeoplePage />
      </Route>
      <Redirect exact path="/" to="home" />
      <NotFoundPage />
    </Switch>
  </>
);

export default App;
