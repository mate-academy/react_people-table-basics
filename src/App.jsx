import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage } from './components/HomePage/HomePage';
import { Header } from './components/Header/Header';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFounPage/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/people" component={PeoplePage} />
      <Route path="/" component={HomePage} exact />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
