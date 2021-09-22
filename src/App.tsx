import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <Switch>

      <Route exact path="/home">
        <HomePage />
      </Route>

      <Route exact path="/people">
        <PeoplePage />
      </Route>

      <Redirect exact from="/" to="/home" />

      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
