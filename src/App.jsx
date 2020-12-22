import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => (
  <>
    <Header />
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people" component={PeoplePage} />
        <Redirect path="/home" to="/" />
        <NotFoundPage />
      </Switch>
    </div>
  </>
);
