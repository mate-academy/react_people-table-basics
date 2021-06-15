import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">

    <Header />

    <section>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/people" component={PeoplePage} />

        <NotFoundPage />
      </Switch>
    </section>
  </div>
);

export default App;
