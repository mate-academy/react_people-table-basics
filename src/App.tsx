import React from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';

const App: React.FC = () => (
  <div className="app">
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
