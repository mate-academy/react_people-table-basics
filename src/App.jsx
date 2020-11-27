import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './Header/Header';
import { HomePage } from './HomePage/HomePage';
import { PeoplePage } from './PeoplePage/PeoplePage';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';
import './App.scss';

const App = () => (
  <div className="App">
    <Header />

    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/people" exact>
        <PeoplePage />
      </Route>
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
